/// <reference path="../typed/nedb/nedb.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
/// <reference path="../typed/lodash/lodash.d.ts" />
var _ = require('lodash');
var q = require('q');
var Datastore = require('nedb');
var ItemType = (function () {
    function ItemType() {
    }
    ItemType.THERMOSTAT = 'thermostat';
    ItemType.WEATHERSTATION = 'weatherstation';
    ItemType.LIGHT = 'light';
    ItemType.COLORLIGHT = 'colorlight';
    ItemType.DIMMER = 'dimmer';
    ItemType.COLORDIMMER = 'colordimmer';
    ItemType.SWITCH = 'switch';
    ItemType.BODYWEIGHT = 'bodyweight';
    ItemType.HEART_RATE_MONITOR = 'heartrate';
    ItemType.DOORLOCK = 'doorlock';
    ItemType.WINDOW_CONTACT = 'windowcontact';
    ItemType.CCTV = 'cctv';
    ItemType.SMOKE_DETECTOR = 'smokedetector';
    ItemType.UNDEFINED = 'undefined';
    return ItemType;
})();
exports.ItemType = ItemType;
var ItemDatastore = (function () {
    function ItemDatastore() {
        this.datastore = new Datastore();
    }
    ItemDatastore.getInstance = function () {
        if (ItemDatastore.instance == null) {
            ItemDatastore.instance = new ItemDatastore();
        }
        return ItemDatastore.instance;
    };
    ItemDatastore.init = function () {
        if (ItemDatastore.instance == null) {
            ItemDatastore.instance = new ItemDatastore();
        }
    };
    ItemDatastore.prototype.getItems = function (query) {
        var deferred = q.defer();
        this.datastore.find(query, function (err, docs) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            }
            else {
                deferred.resolve(docs);
            }
        });
        return deferred.promise;
    };
    ItemDatastore.prototype.upsertItem = function (item) {
        var deferred = q.defer();
        var datastore = this.datastore;
        var $set = {};
        if (item.itemId != null)
            $set['itemId'] = item.itemId;
        if (item.type != null)
            $set['type'] = item.type;
        if (item.title != null)
            $set['title'] = item.title;
        if (item.deviceId != null)
            $set['deviceId'] = item.deviceId;
        if (item.locationId != null)
            $set['locationId'] = item.locationId;
        _.forEach(item.values, function (n, key) {
            $set['values.' + key] = n;
        });
        this.datastore.update({ id: item.itemId }, { $set: $set }, { upsert: true }, function (err) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            }
            else {
                deferred.resolve(item);
            }
        });
        return deferred.promise;
    };
    return ItemDatastore;
})();
exports.ItemDatastore = ItemDatastore;
