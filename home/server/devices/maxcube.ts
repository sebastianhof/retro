/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/q/Q.d.ts" />
import * as _ from 'lodash';
import * as q from 'q';

import {IDevice} from './idevice';
import {ItemDatastore} from "../datastores/itemDatastore";
import {RetroHub} from "../retro/hub";
import {DeviceDatastore} from "../datastores/deviceDatastore";
import {ItemType} from "../models/itemModel";
import {ItemModel} from "../models/itemModel";
import {DeviceModel} from "../models/deviceModel";
import {DeviceType} from "../models/deviceModel";

var MaxCube = require('././maxcube');

export class Maxcube implements IDevice {
    id:string;
    ip:string;

    private maxcube;
    public static CLOSED_EVENT:string = 'maxcube:closed';
    public static ERROR_EVENT:string = 'maxcube:error';
    public static CONNECTED_EVENT:string = 'maxcube:connected';
    public static CONFIGURATION_UPDATE_EVENT:string = 'maxcube:configuration:updated';
    public static STATUS_UPDATE_EVENT:string = 'maxcube:status:updated';

    constructor(id:string, ip:string) {
        this.id = id;
        this.ip = ip;
        var deviceId = id;

        try {

            var maxcube = new MaxCube(ip, '62910');

            maxcube.client.on('close', function () {
                console.log(Maxcube.CLOSED_EVENT);
                RetroHub.getInstance().emit(Maxcube.CLOSED_EVENT, id);
            });

            maxcube.client.on('error', function () {
                console.log(Maxcube.ERROR_EVENT);
                RetroHub.getInstance().emit(Maxcube.ERROR_EVENT, id);
            });

            maxcube.client.on('connected', function () {
                console.log(Maxcube.CONNECTED_EVENT);
                RetroHub.getInstance().emit(Maxcube.CONNECTED_EVENT, id);
            });

            maxcube.on('configurationUpdate', function (configuration) {

                var type:ItemType = ItemType.UNDEFINED;
                var values:any = {};
                if (configuration.device_type == 2) {
                    type = ItemType.THERMOSTAT;
                    values.serial = configuration.serial;
                    values.minTemp = configuration.min_setpoint_temp;
                    values.maxTemp = configuration.max_setpoint_temp;
                    values.ecoTemp = configuration.eco_temp;
                    values.comfortTemp = configuration.comfort_temp;
                } else if (configuration.device_type == 4) {
                    type = ItemType.WINDOW_CONTACT;
                }

                ItemDatastore.getInstance().upsertItem(<ItemModel> {
                    uuid: <string> configuration.rf_address, type: type, deviceId: deviceId, values: values
                }).then(function () {
                    console.log(Maxcube.CONFIGURATION_UPDATE_EVENT);
                    RetroHub.getInstance().emit(Maxcube.CONFIGURATION_UPDATE_EVENT, id);
                });

            });

            maxcube.on('statusUpdate', function (devicesStatus) {
                var promises = Array();

                _.forEach(devicesStatus, function (n:any, key:string) {
                    promises.push(ItemDatastore.getInstance().upsertItem(<ItemModel> {
                        uuid: key, deviceId: deviceId, values: {'currentTemp': n.temp}
                    }));
                });

                q.allSettled(promises).then(function () {
                    console.log(Maxcube.STATUS_UPDATE_EVENT);
                    RetroHub.getInstance().emit(Maxcube.STATUS_UPDATE_EVENT, id);
                });

            });

            this.maxcube = maxcube;


        } catch (err) {
            console.log(err);
            RetroHub.getInstance().emit(Maxcube.ERROR_EVENT, id);
        }

    }

    destruct() {
        this.maxcube.close();
    }

    static setup(ip:string) {
        var defer = q.defer();

        DeviceDatastore.getInstance().getDevice({'type': DeviceType.MAXCUBE}).then(function (device:DeviceModel) {
            if (device == null) {
                // no device available

                DeviceDatastore.getInstance().upsertDevice(<DeviceModel> {
                    'uuid': 'TTTT',
                    'title': 'Max!Cube',
                    'type': DeviceType.MAXCUBE,
                }).then(function (device:any) {
                    var maxcube = new Maxcube(device._id, ip);
                    RetroHub.getInstance().registerDevice(maxcube);
                });
                defer.resolve(null);

            } else {

                // device available
                var registeredDevice = RetroHub.getInstance().getDevice(device._id);
                if (registeredDevice == null) {
                    var maxcube = new Maxcube(device._id, ip);
                    RetroHub.getInstance().registerDevice(maxcube);
                } else {
                    if (registeredDevice.ip != ip) {
                        // IP has changed
                        var maxcube = new Maxcube(device._id, ip);
                        RetroHub.getInstance().registerDevice(maxcube);
                        RetroHub.getInstance().unregisterDevice(registeredDevice);
                    }
                }
                defer.resolve(null);

            }

        }, function (err) {
            console.log('MaxCube: Could not get device');
            defer.reject(500);
        });

        return defer.promise;
    }


}