/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/q/Q.d.ts" />
import * as _ from 'lodash';
import * as q from 'q';

import {IDevice} from './idevice';

import {ActModel, SenseModel, ConfigurationModel, ConfigurationType} from '../models/commandModel';
import {DeviceType, DeviceModel, DeviceValues} from "../models/deviceModel";
import {ItemModel, ItemType, ItemCategory} from "../models/itemModel";

import {RetroHub} from "../hub";
import {ColorLightValues} from "../models/itemModel";
import {ColorDimmerValues} from "../models/itemModel";
import {ColorMode} from "../models/itemModel";
import {LightValues} from "../models/itemModel";
import {DimmerValues} from "../models/itemModel";

import {DEFAULT_LOCATION_ID} from '../constants';
import {ActType} from "../models/commandModel";


var hue = require("node-hue-api");
var HueApi = require("node-hue-api").HueApi;
var LightState = require("node-hue-api").lightState;

interface PhilipsColorDimmerValues extends ColorDimmerValues {
    lightId: string
}

interface PhilipsColorLightValues extends ColorLightValues {
    lightId: string
}

interface PhilipsDimmerValues extends DimmerValues {
    lightId: string
}

interface PhilipsLightValues extends LightValues {
    lightId: string
}


export class PhilipsHueBridge implements IDevice {
    id:string;
    hostName:string;
    hueApi:any;

    constructor(id:string, hostName:string, userName:string) {
        this.id = id;
        this.hostName = hostName;

        if (userName != null) {
            this.hueApi = new HueApi(hostName, userName);
            this.initLights();
        } else {
            this.hueApi = new HueApi();
        }

        // add device
        let deviceModel = <DeviceModel> {
            id: this.id,
            type: DeviceType.PHILIPS_HUE_BRIDGE,
            title: 'Philips Hue Bridge',
            values: <PhilipsHueBridgeDeviceValues> {
                status: userName != null ? PhilipsHueBridgeStatus.PAIRED : PhilipsHueBridgeStatus.UNPAIRED,
                userName: userName
            }
        };
        RetroHub.getInstance().dispatchJob(RetroHub.ADD_DEVICE_JOB, deviceModel);


    }

    act(act:ActModel, done) {
        console.log('Acting Philips Hue Bridge (' + this.id + ')');

        RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: act.itemId}).then((item:ItemModel) => {

            let state;

            switch (act.type) {
                case ActType.SET_BRIGHTNESS:

                    item.values['brightness'] = act.value;
                    item.values['on'] = act.value > 0;
                    RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_ITEM_JOB, item);

                    if (act.value == 0) {
                        console.log(`Setting brightness of Philips item ${item.id} to off`);
                        state = LightState.create().brightness(0).off();
                    } else if (act.value > 0 && act.value <= 100) {
                        console.log(`Setting brightness of Philips item ${item.id} to ${act.value}`);
                        state = LightState.create().on().brightness(act.value);
                    }

                    this.hueApi.setLightState(parseInt(item.values['lightId']), state).then(() => {
                            this.senseLights();
                            done();
                        }, (err) => done(err)
                    );

                    // update brightness value


                    break;
                case ActType.SET_COLOR:

                    item.values['saturation'] = act.value.saturation;
                    item.values['hue'] = act.value.hue;
                    RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_ITEM_JOB, item);

                    if (act.value.hue != null && act.value.saturation != null) {
                        console.log(`Setting color of Philips item ${item.id} to hue ${act.value.hue} and sat ${act.value.saturation}`);
                        state = LightState.create().hue((act.value.hue / 365.0) * 65535.0).sat((act.value.saturation / 100.0) * 255.0);
                        this.hueApi.setLightState(parseInt(item.values['lightId']), state).then(() => {
                                this.senseLights();
                                done();
                            }, (err) => done(err)
                        );
                    }

                    break;
                default:
                    done(new Error('Invalid type'));
            }

        }, () => done(new Error('Item not found')));

    }

    sense(sense:SenseModel, done) {
        console.log('Sensing Philips Hue Bridge (' + this.id + ')');
        this.senseLights();
        done(); // TODO
    }

    parseTypeAndValues(itemModel:ItemModel, lightData) {

        switch (lightData.type.toLowerCase()) {

            case 'extended color light':
            case 'color light':

                itemModel.type = ItemType.COLOR_DIMMER;
                itemModel.values = <PhilipsColorDimmerValues> {
                    lightId: itemModel.values['lightId'],
                    on: lightData.state.on,
                    hue: Math.round((lightData.state.hue / 65535.0) * 365),
                    saturation: Math.round((lightData.state.sat / 255.0) * 100),
                    brightness: Math.round((lightData.state.bri / 255.0) * 100),
                    colorTemp: lightData.state.ct,
                    mode: lightData.state.colormode == 'ct' ? ColorMode.COLOR_TEMP : ColorMode.HUE_SAT
                };

                break;

            case 'color temperature light':

                itemModel.type = ItemType.COLOR_LIGHT;
                itemModel.values = <PhilipsColorLightValues> {
                    lightId: itemModel.values['lightId'],
                    on: lightData.state.on,
                    colorTemp: lightData.state.ct
                };
                break;

            case 'dimmable Light':

                itemModel.type = ItemType.DIMMER;
                itemModel.values = <PhilipsDimmerValues> {
                    lightId: itemModel.values['lightId'],
                    on: lightData.state.on,
                    brightness: Math.round((lightData.state.bri / 255.0) * 100)
                };
                break;


            case 'on/off light':

                itemModel.type = ItemType.LIGHT;
                itemModel.values = <PhilipsLightValues> {
                    lightId: itemModel.values['lightId'],
                    on: lightData.state.on
                };
                break;

        }

    }

    initLights() {

        this.hueApi.lights().then((data:any) => {

            _.forEach(data.lights, (light:any) => {

                RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {
                    id: light.uniqueid,
                    deviceId: this.id
                }).then((item:ItemModel) => {
                    item.values['lightId'] = light.id;
                    RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_ITEM_JOB, item);
                }, () => {
                    let item = <ItemModel> {
                        id: light.uniqueid,
                        deviceId: this.id,
                        locationId: DEFAULT_LOCATION_ID,
                        category: ItemCategory.LIGHTING,
                        title: light.name,
                        isFavorite: false,
                        values: {
                            lightId: light.id,
                            title: light.name,
                        }
                    };
                    RetroHub.getInstance().dispatchJob(RetroHub.ADD_ITEM_JOB, item);
                })


            });
        });

    }

    senseLights() {

        this.hueApi.getFullState().then((data:any) => {

            _.forEach(data.lights, (light:any) => {

                RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {
                    id: light.uniqueid,
                    deviceId: this.id
                }).then((item:ItemModel) => {
                    this.parseTypeAndValues(item, light);
                    RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_ITEM_JOB, item);
                }, () => {
                    let item = <ItemModel> {
                        id: light.uniqueid,
                        deviceId: this.id,
                        locationId: DEFAULT_LOCATION_ID,
                        category: ItemCategory.LIGHTING,
                        title: light.name,
                        isFavorite: false,
                    };
                    this.parseTypeAndValues(item, light);
                    RetroHub.getInstance().dispatchJob(RetroHub.ADD_ITEM_JOB, item);
                });

            });

        }).done();

    }

    configure(configuration:ConfigurationModel, done) {

        switch (configuration.type) {

            case ConfigurationType.PAIR:

                this.hueApi.registerUser(this.hostName, 'Retro').then((userName) => {
                    console.log('Paired Philips Hue Bridge with username ' + userName);

                    RetroHub.getInstance().dispatchJob(RetroHub.FIND_DEVICE_JOB, {
                        id: this.id
                    }).then((deviceModel:DeviceModel) => {
                        let values = <PhilipsHueBridgeDeviceValues> deviceModel.values;
                        values.userName = userName;

                        RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_DEVICE_JOB, deviceModel);

                        this.hueApi = new HueApi(this.hostName, userName);
                        this.senseLights();

                        done();
                    }, (err) => done(err));

                }, (err) => done(err));

                break;

        }


    }

    onRegister() {
        console.log('Registered Philips Hue Bridge (' + this.id + ')');
    }

    onUnregister() {
        console.log('Unregistered Philips Hue Bridge (' + this.id + ')');
    }

    static discover() {

        hue.nupnpSearch().then((bridges:any) => {
            if (bridges.length > 0) {

                _.forEach(bridges, (bridge:any) => {
                    let id = bridge.id;
                    let hostName = bridge.ipaddress;

                    RetroHub.getInstance().dispatchJob(RetroHub.FIND_DEVICE_JOB, {
                        id: id
                    }).then((deviceModel:DeviceModel) => {
                        let values = <PhilipsHueBridgeDeviceValues> deviceModel.values;
                        let device = new PhilipsHueBridge(id, hostName, values.userName);
                        RetroHub.getInstance().registerDevice(device);
                    }, () => {
                        let device = new PhilipsHueBridge(id, hostName, null);
                        RetroHub.getInstance().registerDevice(device);
                    });

                });

            }

        }).done();

    }

    static demoDiscover() {

        hue.nupnpSearch().then((bridges:any) => {

            if (bridges.length > 0) {

                _.forEach(bridges, (bridge:any) => {
                    let id = bridge.id;
                    let hostName = bridge.ipaddress;
                    let userName = '23839dac7a4fbd7f751e172946cc131e';

                    let device = new PhilipsHueBridge(id, hostName, userName);
                    RetroHub.getInstance().registerDevice(device);

                });
            }

        });

    }

}

interface PhilipsHueBridgeDeviceValues extends DeviceValues {
    status: PhilipsHueBridgeStatus,
    userName?: string
}

enum PhilipsHueBridgeStatus {
    UNPAIRED = 0,
    PAIRED = 1
}