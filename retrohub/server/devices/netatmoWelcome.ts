import * as _ from 'lodash';
import * as q from 'q';

import {IDevice} from './idevice';

import {ActModel, SenseModel, ConfigurationModel} from '../models/commandModel';
import {DeviceType, DeviceModel, DeviceValues} from "../models/deviceModel";
import {ItemModel, ItemType, ItemCategory, CCTVValues} from "../models/itemModel";
import {RetroHub} from "../hub";
import {RetroUUID} from '../utils';

import {DEFAULT_LOCATION_ID} from '../constants';

var netatmo = require('netatmo');

export class NetatmoWelcome implements IDevice {
    id:string;
    api:any;

    constructor(username, password) {
        this.id = RetroUUID.generateUUID();

        this.api = new netatmo({
            "client_id": "5697d3c569f740f8030315f3",
            "client_secret": "IhDIRtdfvTc9SWEfAywfp8i5BLFRwTRlizxXK9hS",
            "username": username,
            "password": password
        });

        this.api.on('get-homedata', (err, homes) => {

            _.forEach(homes, (home:any) => {

                _.forEach(home.cameras, (camera:any) => {


                    RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: camera.id}).then((item) => {
                        item.values = <CCTVValues> {
                            streamingUrl: camera.is_local ? camera.vpn_url + '/live/index_local.m3u8' : camera.vpn_url + '/live/index.m3u8',
                            snapshotUrl: camera.vpn_url + '/live/snapshot_720.jpg',
                            on: camera.status == 'on' ? true : false
                        };
                        RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_ITEM_JOB, item);
                    }, () => {
                        let item = <ItemModel> {
                            id: camera.id,
                            deviceId: this.id,
                            locationId: DEFAULT_LOCATION_ID,
                            type: ItemType.CCTV,
                            category: ItemCategory.SECURITY,
                            title: camera.name,
                            isFavorite: false,
                            values: <CCTVValues> {
                                streamingUrl: camera.is_local ? camera.vpn_url + '/live/index_local.m3u8' : camera.vpn_url + '/live/index.m3u8',
                                snapshotUrl: camera.vpn_url + '/live/snapshot_720.jpg',
                                on: camera.status == 'on' ? true : false
                            }
                        };
                        RetroHub.getInstance().dispatchJob(RetroHub.ADD_ITEM_JOB, item);
                    });

                });

            });


        });

        this.api.getHomeData();

        // Add device

        let device = <DeviceModel> {
            id: this.id,
            type: DeviceType.NETATMO_WELCOME,
            title: 'Netatmo Welcome',
            values: {
                //username: username,
                //password: password
                // TODO: store oauth token
            }
        };
        RetroHub.getInstance().dispatchJob(RetroHub.ADD_DEVICE_JOB, device);

    }

    act(act:ActModel, done) {
        // Not supported
        done();
    }

    sense(sense:SenseModel, done) {
        console.log('Sensing Netatmo Welcome (' + this.id + ')');
        this.api.getDevicelist();
        done(); // TODO
    }

    configure(configuration:ConfigurationModel, done) {
        done();
    }

    onRegister() {
        console.log('Registered Netatmo Welcome (' + this.id + ')');
    }

    onUnregister() {
        console.log('Unregistered Netatmo Welcome (' + this.id + ')');
    }

    static demoDiscover() {

        // Demo setup
        var device = new NetatmoWelcome("mail@sebastianhof.com", "HmjNXrKqs6ymdxvFYfijLDBou");
        RetroHub.getInstance().registerDevice(device);

    }

    static setup(username, password) {
        var defer = q.defer();

        // check connection
        let api = new netatmo({
            "client_id": "5697d3c569f740f8030315f3",
            "client_secret": "IhDIRtdfvTc9SWEfAywfp8i5BLFRwTRlizxXK9hS",
            "username": username,
            "password": password
        });

        api.on("error", function (error) {
            defer.reject(error);
        });

        api.on('get-user', (err, user) => {
            // success
            var device = new NetatmoWelcome(username, password);
            RetroHub.getInstance().registerDevice(device);

            defer.resolve(null);
        });

        return defer.promise;
    }

}