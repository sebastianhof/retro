/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/q/Q.d.ts" />
import * as _ from 'lodash';
import * as q from 'q';

import {IDevice} from './idevice';
import {RetroHub} from "../hub";
import {ItemType} from "../models/itemModel";

import {ActModel, SenseModel, ConfigurationModel} from '../models/commandModel';
import {ItemModel} from "../models/itemModel";
import {DeviceModel} from "../models/deviceModel";
import {DeviceType} from "../models/deviceModel";
import {ItemCategory} from "../models/itemModel";
import {ThermostatValues} from "../models/itemModel";
import {WindowContactValues} from "../models/itemModel";

import {DEFAULT_LOCATION_ID} from '../constants';
import {ActType} from "../models/commandModel";

var MaxCube = require('./lib/maxcube');

export class Maxcube implements IDevice {
    id:string;
    hostName:string;

    private maxcube;
    public static CLOSED_EVENT:string = 'maxcube:closed';
    public static ERROR_EVENT:string = 'maxcube:error';
    public static CONNECTED_EVENT:string = 'maxcube:connected';
    public static CONFIGURATION_UPDATE_EVENT:string = 'maxcube:configuration:updated';
    public static STATUS_UPDATE_EVENT:string = 'maxcube:status:updated';

    constructor(id:string, hostName:string, port:string) {
        this.id = id;
        this.hostName = hostName;

        try {

            this.maxcube = new MaxCube(hostName, port);

            this.maxcube.on('error', function (err) {
                console.log(err);
            });

            this.maxcube.on('configurationUpdate', (config) => {

                RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: config.rf_address}).then((item) => {

                    switch (config.device_type) {
                        case 2:
                            item.values = <ThermostatValues> {
                                maxTemp: config.max_setpoint_temp || 30,
                                minTemp: 0
                            };
                            break;
                    }
                    RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_ITEM_JOB, item);
                }, () => {
                    let item;

                    switch (config.device_type) {
                        case 2:
                            // thermostat
                            item = <ItemModel> {
                                id: config.rf_address,
                                deviceId: this.id,
                                locationId: DEFAULT_LOCATION_ID,
                                type: ItemType.THERMOSTAT,
                                category: ItemCategory.CLIMATE,
                                title: config.rf_address,
                                isFavorite: false,
                                values: <ThermostatValues> {
                                    maxTemp: config.max_setpoint_temp || 30,
                                    minTemp: 0
                                }
                            };
                            break;
                        case 4:
                            // window contact
                            item = <ItemModel> {
                                id: config.rf_address,
                                deviceId: this.id,
                                locationId: DEFAULT_LOCATION_ID,
                                type: ItemType.WINDOW_CONTACT,
                                category: ItemCategory.SECURITY,
                                title: config.rf_address,
                                isFavorite: false
                            };
                            break;
                    }

                    if (item != null) {
                        RetroHub.getInstance().dispatchJob(RetroHub.ADD_ITEM_JOB, item);
                    }
                });


            });

            this.maxcube.on('statusUpdate', (devicesStatus) => {

                _.forEach(devicesStatus, (status:any) => {

                    RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: status.rf_address}).then((item) => {

                        if (status.temp != null && status.setpoint != null) {
                            item.values = <ThermostatValues> {
                                temp: status.setpoint,
                                currentTemp: status.temp,
                                maxTemp: 30,
                                minTemp: 0
                            };
                        } else if (status.closed != null) {
                            item.values = <WindowContactValues> {
                                closed: status.closed
                            }
                        }

                        RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_ITEM_JOB, item);
                    }, () => {
                        let item;
                        if (status.temp != null && status.setpoint != null) {
                            // thermostat
                            item = <ItemModel> {
                                id: status.rf_address,
                                deviceId: this.id,
                                locationId: DEFAULT_LOCATION_ID,
                                type: ItemType.THERMOSTAT,
                                category: ItemCategory.CLIMATE,
                                title: status.rf_address,
                                isFavorite: false,
                                values: <ThermostatValues> {
                                    temp: status.setpoint,
                                    currentTemp: status.temp,
                                    maxTemp: 30,
                                    minTemp: 0
                                }
                            };

                        } else if (status.closed != null) {
                            item = <ItemModel> {
                                id: status.rf_address,
                                deviceId: this.id,
                                locationId: DEFAULT_LOCATION_ID,
                                type: ItemType.WINDOW_CONTACT,
                                category: ItemCategory.SECURITY,
                                title: status.rf_address,
                                isFavorite: false,
                                values: <WindowContactValues> {
                                    closed: status.closed
                                }
                            };
                        }

                        if (item != null) {
                            RetroHub.getInstance().dispatchJob(RetroHub.ADD_ITEM_JOB, item);
                        }

                    });
                });

            });

            this.maxcube.doHeartbeat();

        } catch (err) {
            console.log(err);
        }

    }

    act(act:ActModel, done) {
        console.log('Acting Max!Cube (' + this.id + ')');

        RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: act.itemId}).then((item:ItemModel) => {

            switch (act.type) {
                case ActType.SET_TEMP:

                    item.values['temp'] = act.value;
                    RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_ITEM_JOB, item);

                    console.log(`Setting temperature of Max!Cube item ${item.id} to ${act.value}`);
                    try {

                        this.maxcube.setTemperature(item.id, parseInt(act.value));

                    } catch (err) {
                        console.log(err);
                    }

                    done();
                    break;
                default:
                    done(new Error('Invalid type'));
            }

        }, () => done(new Error('Item not found')));

    }

    sense(sense:SenseModel, done) {
        console.log('Sensing Max!Cube (' + this.id + ')');

        try {

            this.maxcube.doHeartbeat();

        } catch (err) {
            console.log(err);
        }

        done(); // TODO
    }

    configure(configuration:ConfigurationModel, done) {

    }

    onRegister() {
        console.log('Registered Max!Cube (' + this.id + ')');
    }

    onUnregister() {
        console.log('Unregistered Max!Cube (' + this.id + ')');
    }

    static demoDiscover() {

        let hostName = '192.168.2.38';
        let port = '62910';

        try {

            let maxcube = new MaxCube(hostName, port);

            maxcube.on('error', function (err) {
                console.log(err);
            });

            maxcube.on('connected', (config) => {

                var device = new Maxcube(config.serial_number, hostName, port);
                RetroHub.getInstance().registerDevice(device);

                maxcube.close();

            });

            maxcube.doHeartbeat();

        } catch (err) {
            console.log(err);
        }

    }

}