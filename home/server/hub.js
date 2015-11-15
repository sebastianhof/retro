/// <reference path="typed/node/node.d.ts" />
/// <reference path="typed/lodash/lodash.d.ts" />
var _ = require('lodash');
var events_1 = require("events");
var maxcube_1 = require("./devices/maxcube");
var RetroHub = (function () {
    function RetroHub() {
        this.devices = [];
        this.eventEmitter = new events_1.EventEmitter();
    }
    RetroHub.getInstance = function () {
        if (RetroHub.instance == null) {
            RetroHub.instance = new RetroHub();
        }
        return RetroHub.instance;
    };
    RetroHub.init = function () {
        if (RetroHub.instance == null) {
            RetroHub.instance = new RetroHub();
        }
        // TODO: autodetect devices
        maxcube_1.Maxcube.setup('192.168.2.38');
    };
    RetroHub.prototype.on = function (event, func) {
        this.eventEmitter.on(event, func);
    };
    RetroHub.prototype.once = function (event, func) {
        this.eventEmitter.once(event, func);
    };
    RetroHub.prototype.removeListener = function (event, func) {
        this.eventEmitter.removeListener(event, func);
    };
    RetroHub.prototype.emit = function (event, arg) {
        this.eventEmitter.emit(event, arg);
    };
    RetroHub.prototype.hasDevice = function (id) {
        return _.find(this.devices, { id: id }) != null;
    };
    RetroHub.prototype.getDevice = function (id) {
        return _.find(this.devices, { id: id });
    };
    RetroHub.prototype.unregisterDevice = function (device) {
        if (this.hasDevice(device.id)) {
            _.remove(this.devices, { id: device.id });
            device.destruct();
            return true;
        }
        else {
            return false;
        }
    };
    RetroHub.prototype.registerDevice = function (device) {
        if (this.hasDevice(device.id)) {
            return false;
        }
        else {
            this.devices.push(device);
            return true;
        }
    };
    return RetroHub;
})();
exports.RetroHub = RetroHub;
