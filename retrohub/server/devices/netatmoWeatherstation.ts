import * as _ from 'lodash';
import * as q from 'q';

import {IDevice} from './idevice';

import {ActModel, SenseModel, ConfigurationModel} from '../models/commandModel';
import {DeviceType, DeviceModel, DeviceValues} from "../models/deviceModel";
import {ItemModel, ItemType, ItemCategory, WeatherStationValues} from "../models/itemModel";
import {RetroHub} from "../hub";
import {RetroUUID} from '../utils';
import {DEFAULT_LOCATION_ID} from '../constants';

var netatmo = require('netatmo');

export class NetatmoWeatherstation implements IDevice {
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

        this.api.on('get-devicelist', (err, devices, modules) => {

            _.forEach(devices, (device:any) => {

                RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: device._id}).then((item) => {
                    item.values = <WeatherStationValues> {
                        temperature: device.dashboard_data.Temperature,
                        pressure: device.dashboard_data.Pressure,
                        humidity: device.dashboard_data.Humidity,
                        co2: device.dashboard_data.CO2
                    };
                    RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_ITEM_JOB, item);
                }, () => {
                    let item = <ItemModel> {
                        id: device._id,
                        deviceId: this.id,
                        locationId: DEFAULT_LOCATION_ID,
                        type: ItemType.WEATHER_STATION,
                        category: ItemCategory.CLIMATE,
                        title: device.module_name,
                        isFavorite: false,
                        values: <WeatherStationValues> {
                            temperature: device.dashboard_data.Temperature,
                            pressure: device.dashboard_data.Pressure,
                            humidity: device.dashboard_data.Humidity,
                            co2: device.dashboard_data.CO2
                        }
                    };
                    RetroHub.getInstance().dispatchJob(RetroHub.ADD_ITEM_JOB, item);
                });

            });

            _.forEach(modules, (module:any) => {

                RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: module._id}).then((item) => {
                    item.values = <WeatherStationValues> {
                        temperature: module.dashboard_data.Temperature,
                        pressure: module.dashboard_data.Pressure,
                        humidity: module.dashboard_data.Humidity,
                        co2: module.dashboard_data.CO2
                    };
                    RetroHub.getInstance().dispatchJob(RetroHub.UPDATE_ITEM_JOB, item);
                }, () => {
                    let item = <ItemModel> {
                        id: module._id,
                        deviceId: this.id,
                        locationId: DEFAULT_LOCATION_ID,
                        type: ItemType.WEATHER_STATION,
                        category: ItemCategory.CLIMATE,
                        title: module.module_name,
                        isFavorite: false,
                        values: <WeatherStationValues> {
                            temperature: module.dashboard_data.Temperature,
                            pressure: module.dashboard_data.Pressure,
                            humidity: module.dashboard_data.Humidity,
                            co2: module.dashboard_data.CO2
                        }
                    };
                    RetroHub.getInstance().dispatchJob(RetroHub.ADD_ITEM_JOB, item);
                });

            });

        });

        this.api.getDevicelist();

        // Add device

        let device = <DeviceModel> {
            id: this.id,
            type: DeviceType.NETATMO_WEATHERSTATION,
            title: 'Netatmo Weatherstation',
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
        console.log('Sensing Netatmo Weatherstation (' + this.id + ')');
        this.api.getDevicelist();
        done(); // TODO
    }

    configure(configuration:ConfigurationModel, done) {
        done();
    }

    onRegister() {
        console.log('Registered Netatmo Weatherstation (' + this.id + ')');
    }

    onUnregister() {
        console.log('Unregistered Netatmo Weatherstation (' + this.id + ')');
    }

    static demoDiscover() {

        // Demo setup
        var device = new NetatmoWeatherstation("mail@sebastianhof.com", "HmjNXrKqs6ymdxvFYfijLDBou");
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
            var device = new NetatmoWeatherstation(username, password);
            RetroHub.getInstance().registerDevice(device);

            defer.resolve(null);
        });

        api.getUser();

        return defer.promise;
    }

}