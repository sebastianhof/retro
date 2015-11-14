/// <reference path="../typed/nedb/nedb.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
/// <reference path="../typed/lodash/lodash.d.ts" />
import * as _ from 'lodash';
import * as q from 'q';
var Datastore = require('nedb');

export class ItemType {
    static THERMOSTAT = 'thermostat';
    static WEATHERSTATION = 'weatherstation';
    static LIGHT = 'light';
    static COLORLIGHT = 'colorlight';
    static DIMMER = 'dimmer';
    static COLORDIMMER = 'colordimmer';
    static SWITCH = 'switch';
    static BODYWEIGHT = 'bodyweight';
    static HEART_RATE_MONITOR = 'heartrate';
    static DOORLOCK = 'doorlock';
    static WINDOW_CONTACT = 'windowcontact';
    static CCTV = 'cctv';
    static SMOKE_DETECTOR = 'smokedetector';
    static UNDEFINED = 'undefined';
}

export interface Item {
    itemId: string,
    type?: ItemType,
    title?: string,
    deviceId?: string,
    locationId?: string,
    values: any
}

export class ItemDatastore {
    private static instance;
    private datastore;

    constructor() {
        this.datastore = new Datastore();
    }

    static getInstance() {
        if (ItemDatastore.instance == null) {
            ItemDatastore.instance = new ItemDatastore();
        }
        return ItemDatastore.instance;
    }

    static init() {
        if (ItemDatastore.instance == null) {
            ItemDatastore.instance = new ItemDatastore();
        }
    }

    public getItems(query:any) {
        var deferred = q.defer();

        this.datastore.find(query, function (err, docs) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(docs);
            }
        });

        return deferred.promise;
    }

    public upsertItem(item:Item) {
        var deferred = q.defer();

        var datastore = this.datastore;

        var $set:any = {};
        if (item.itemId != null) $set['itemId'] = item.itemId;
        if (item.type != null) $set['type'] = item.type;
        if (item.title != null) $set['title'] = item.title;
        if (item.deviceId != null) $set['deviceId'] = item.deviceId;
        if (item.locationId != null) $set['locationId'] = item.locationId;

        _.forEach(item.values, function (n, key) {
            $set['values.' + key] = n;
        });

        this.datastore.update({id: item.itemId}, {$set: $set}, {upsert: true}, function (err) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(item);
            }
        });

        return deferred.promise;
    }


}