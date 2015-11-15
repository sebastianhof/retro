/// <reference path="typed/express/express.d.ts" />
/// <reference path="typed/lodash/lodash.d.ts" />
/// <reference path="typed/q/Q.d.ts" />
var express = require('express');
var _ = require('lodash');
var q = require('q');
var maxcube_1 = require('./devices/maxcube');
var hub_1 = require("./hub");
var itemDatastore_1 = require("./datastores/itemDatastore");
var deviceDatastore_1 = require("./datastores/deviceDatastore");
/**
 * Device management
 */
var Devices = (function () {
    function Devices(app) {
        app.get('/api/devices/list', function (req, res, next) {
            deviceDatastore_1.DeviceDatastore.getInstance().getDevices().then(function (devices) {
                res.send({ devices: devices });
            }, function (err) {
                res.sendStatus(500);
            });
        });
        app.get('/api/devices/items/:deviceId', function (req, res, next) {
            itemDatastore_1.ItemDatastore.getInstance().getItems({ deviceId: req.params.deviceId }).then(function (items) {
                res.send({
                    items: _.map(items, function (item) {
                        return {
                            _id: item.id,
                            title: item.title,
                            type: item.type,
                            itemId: item.itemId,
                            locationId: item.locationId
                        };
                    })
                });
            }, function (err) {
                res.sendStatus(500);
            });
        });
        app.post('/api/devices/edit/:deviceId', function (req, res, next) {
            var promises = [];
            var updatedDevice = null;
            deviceDatastore_1.DeviceDatastore.getInstance().getDevice({ _id: req.params.deviceId }).then(function (device) {
                if (device != null) {
                    updatedDevice = device;
                    // update items
                    _.forEach(req.body.items, function (item) {
                        var defer = q.defer();
                        itemDatastore_1.ItemDatastore.getInstance().upsertItem(item).then(function () {
                            defer.resolve(null);
                        }, function (err) {
                            defer.reject(err);
                        });
                        promises.push(defer.promise);
                    });
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(500);
            });
            q.allSettled(promises).then(function () {
                res.send(updatedDevice);
            }, function (err) {
                res.sendStatus(500);
            });
        });
        app.use('/api/devices/setup', this.devicesSetup());
    }
    Devices.prototype.devicesSetup = function () {
        var router = express.Router();
        var deviceDatastore = deviceDatastore_1.DeviceDatastore.getInstance();
        var retroHub = hub_1.RetroHub.getInstance();
        var sendDevice = function (deviceId, res) {
            deviceDatastore.getDevice(deviceId).then(function (device) {
                if (device != null) {
                    res.send(device);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(500);
            });
        };
        // climate
        router.post('/maxcube', function (req, res, next) {
            maxcube_1.Maxcube.setup(req.body.ip).then(function () {
                retroHub.once(maxcube_1.Maxcube.STATUS_UPDATE_EVENT, function (deviceId) {
                    sendDevice(deviceId, res);
                });
                retroHub.once(maxcube_1.Maxcube.CLOSED_EVENT, function () {
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
    };
    return Devices;
})();
exports.Devices = Devices;
