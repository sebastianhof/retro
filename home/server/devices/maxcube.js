/// <reference path="../typed/node/node.d.ts" />
/// <reference path="../typed/lodash/lodash.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
var _ = require('lodash');
var q = require('q');
var itemDatastore_1 = require("../datastores/itemDatastore");
var hub_1 = require("../hub");
var deviceDatastore_1 = require("../datastores/deviceDatastore");
var MaxCube = require('../lib/maxcube');
var Maxcube = (function () {
    function Maxcube(id, ip) {
        this.id = id;
        this.ip = ip;
        var deviceId = id;
        try {
            var maxcube = new MaxCube(ip, '62910');
            maxcube.client.on('close', function () {
                console.log(Maxcube.CLOSED_EVENT);
                hub_1.RetroHub.getInstance().emit(Maxcube.CLOSED_EVENT, id);
            });
            maxcube.client.on('error', function () {
                console.log(Maxcube.ERROR_EVENT);
                hub_1.RetroHub.getInstance().emit(Maxcube.ERROR_EVENT, id);
            });
            maxcube.client.on('connected', function () {
                console.log(Maxcube.CONNECTED_EVENT);
                hub_1.RetroHub.getInstance().emit(Maxcube.CONNECTED_EVENT, id);
            });
            maxcube.on('configurationUpdate', function (configuration) {
                var type = itemDatastore_1.ItemType.UNDEFINED;
                var values = {};
                if (configuration.device_type == 2) {
                    type = itemDatastore_1.ItemType.THERMOSTAT;
                    values.serial = configuration.serial;
                    values.minTemp = configuration.min_setpoint_temp;
                    values.maxTemp = configuration.max_setpoint_temp;
                    values.ecoTemp = configuration.eco_temp;
                    values.comfortTemp = configuration.comfort_temp;
                }
                else if (configuration.device_type == 4) {
                    type = itemDatastore_1.ItemType.WINDOW_CONTACT;
                }
                itemDatastore_1.ItemDatastore.getInstance().upsertItem({
                    itemId: configuration.rf_address, type: type, deviceId: deviceId, values: values
                }).then(function () {
                    console.log(Maxcube.CONFIGURATION_UPDATE_EVENT);
                    hub_1.RetroHub.getInstance().emit(Maxcube.CONFIGURATION_UPDATE_EVENT, id);
                });
            });
            maxcube.on('statusUpdate', function (devicesStatus) {
                var promises = Array();
                _.forEach(devicesStatus, function (n, key) {
                    promises.push(itemDatastore_1.ItemDatastore.getInstance().upsertItem({
                        itemId: key, deviceId: deviceId, values: { 'currentTemp': n.temp }
                    }));
                });
                q.allSettled(promises).then(function () {
                    console.log(Maxcube.STATUS_UPDATE_EVENT);
                    hub_1.RetroHub.getInstance().emit(Maxcube.STATUS_UPDATE_EVENT, id);
                });
            });
            this.maxcube = maxcube;
        }
        catch (err) {
            console.log(err);
            hub_1.RetroHub.getInstance().emit(Maxcube.ERROR_EVENT, id);
        }
    }
    Maxcube.prototype.destruct = function () {
        this.maxcube.close();
    };
    Maxcube.setup = function (ip) {
        var defer = q.defer();
        deviceDatastore_1.DeviceDatastore.getInstance().getDevice({ 'type': deviceDatastore_1.DeviceType.MAXCUBE }).then(function (device) {
            if (device == null) {
                // no device available
                deviceDatastore_1.DeviceDatastore.getInstance().addDevice({
                    'title': 'Max!Cube',
                    'type': deviceDatastore_1.DeviceType.MAXCUBE
                }).then(function (device) {
                    var maxcube = new Maxcube(device._id, ip);
                    hub_1.RetroHub.getInstance().registerDevice(maxcube);
                });
                defer.resolve(null);
            }
            else {
                // device available
                var registeredDevice = hub_1.RetroHub.getInstance().getDevice(device._id);
                if (registeredDevice == null) {
                    var maxcube = new Maxcube(device._id, ip);
                    hub_1.RetroHub.getInstance().registerDevice(maxcube);
                }
                else {
                    if (registeredDevice.ip != ip) {
                        // IP has changed
                        var maxcube = new Maxcube(device._id, ip);
                        hub_1.RetroHub.getInstance().registerDevice(maxcube);
                        hub_1.RetroHub.getInstance().unregisterDevice(registeredDevice);
                    }
                }
                defer.resolve(null);
            }
        }, function (err) {
            console.log('MaxCube: Could not get device');
            defer.reject(500);
        });
        return defer.promise;
    };
    Maxcube.CLOSED_EVENT = 'maxcube:closed';
    Maxcube.ERROR_EVENT = 'maxcube:error';
    Maxcube.CONNECTED_EVENT = 'maxcube:connected';
    Maxcube.CONFIGURATION_UPDATE_EVENT = 'maxcube:configuration:updated';
    Maxcube.STATUS_UPDATE_EVENT = 'maxcube:status:updated';
    return Maxcube;
})();
exports.Maxcube = Maxcube;
