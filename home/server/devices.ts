/// <reference path="typed/express/express.d.ts" />
/// <reference path="typed/lodash/lodash.d.ts" />
/// <reference path="typed/q/Q.d.ts" />
import * as express from 'express';
import * as _ from 'lodash';
import * as q from 'q';

import {Maxcube} from './devices/maxcube'
import {IDevice} from "./devices/idevice";
import {RetroHub} from "./hub";
import {ItemDatastore} from "./datastores/itemDatastore";
import {DeviceDatastore, DeviceType} from "./datastores/deviceDatastore";
import {Item} from "./datastores/itemDatastore";
import {DeviceModel} from "./datastores/deviceDatastore";

/**
 * Device management
 */


export class Devices {

    constructor(app:express.Express) {
        app.get('/api/devices/list', function (req, res, next) {

            DeviceDatastore.getInstance().getDevices().then(function (devices) {
                res.send({devices: devices});
            }, function (err) {
                res.sendStatus(500);
            });

        });

        app.get('/api/devices/items/:deviceId', function (req, res, next) {

            ItemDatastore.getInstance().getItems({deviceId: req.params.deviceId}).then(function (items) {
                res.send({
                    items: _.map(items, function (item:any) {
                        return {
                            _id: item.id,
                            title: item.title,
                            type: item.type,
                            itemId: item.itemId,
                            locationId: item.locationId
                        }
                    })
                });
            }, function (err) {
                res.sendStatus(500);
            })

        });

        app.post('/api/devices/edit/:deviceId', function (req, res, next) {
            var promises = [];
            var updatedDevice = null;

            DeviceDatastore.getInstance().getDevice({_id: req.params.deviceId}).then(function (device) {
                if (device != null) {
                    updatedDevice = device;

                    // update items
                    _.forEach(req.body.items, function (item) {
                        var defer = q.defer();

                        ItemDatastore.getInstance().upsertItem(item).then(function () {
                            defer.resolve(null);
                        }, function (err) {
                            defer.reject(err);
                        });

                        promises.push(defer.promise);
                    });
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(500);
            });


            q.allSettled(promises).then(function () {
                res.send(updatedDevice);
            }, function (err) {
                res.sendStatus(500);
            })
        });

        app.use('/api/devices/setup', this.devicesSetup());

    }

    private devicesSetup():express.Router {
        var router = express.Router();
        var deviceDatastore = DeviceDatastore.getInstance();
        var retroHub = RetroHub.getInstance();

        var sendDevice = function (deviceId, res) {

            deviceDatastore.getDevice(deviceId).then(function (device) {
                if (device != null) {
                    res.send(device);
                } else {
                    res.sendStatus(404);
                }

            }, function (err) {
                res.sendStatus(500);
            });

        };

        // climate
        router.post('/maxcube', function (req, res, next) {
            Maxcube.setup(req.body.ip).then(function () {
                retroHub.once(Maxcube.STATUS_UPDATE_EVENT, function (deviceId) {
                    sendDevice(deviceId, res);
                });
                retroHub.once(Maxcube.CLOSED_EVENT, function () {
                    res.sendStatus(404);
                });
            }, function (status) {
                res.sendStatus(status);
            });
        });


        // lighting
        router.post('/philipshue', function (req, res, next) {

        });

        router.post('/lifx', function (req, res, next) {

        });

        router.post('/wemo', function (req, res, next) {

        });

        // appliances
        router.post('/withings', function (req, res, next) {

        });

        return router;
    }

}