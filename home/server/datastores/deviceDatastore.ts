/// <reference path="../../typings/nedb/nedb.d.ts" />
/// <reference path="../../typings/q/Q.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
import * as _ from 'lodash';
import * as q from 'q';
import {RetroError, RetroLogger} from '../retro/utils'
import {DeviceModel} from "../models/deviceModel";
var Datastore = require('nedb');

export class DeviceDatastore {
    private static instance:DeviceDatastore;
    private datastore;

    constructor() {
        this.datastore = new Datastore();
    }

    static getInstance():DeviceDatastore {
        if (DeviceDatastore.instance == null) {
            DeviceDatastore.instance = new DeviceDatastore();
        }
        return DeviceDatastore.instance;
    }

    /**
     *
     * Get devices
     *
     * @returns {Promise<T>}
     */
    public getDevices() {
        var deferred = q.defer();

        this.datastore.find({}, function (err, docs) {
            if (err) {
                RetroLogger.error(err);
                deferred.reject(RetroError.INTERNAL_ERROR);
            } else {
                deferred.resolve(docs);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * Get device
     *
     * @param query
     * @returns {Promise<T>}
     */
    public getDevice(query:any) {
        var deferred = q.defer();

        this.datastore.findOne(query, function (err, doc) {
            if (err) {
                RetroLogger.error(err);
                deferred.reject(RetroError.INTERNAL_ERROR);
            } else if (doc == null) {
                deferred.reject(RetroError.NOT_FOUND);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * Add or update device
     *
     * @param device
     * @returns {Promise<T>}
     */
    public upsertDevice(device:DeviceModel) {
        var deferred = q.defer();

        var $set:any = {};
        if (device.uuid != null) $set['uuid'] = device.uuid;
        if (device.type != null) $set['type'] = device.type;
        if (device.title != null) $set['title'] = device.title;

        _.forEach(<any> device.values, function (n, key) {
            $set['values.' + key] = n;
        });

        this.datastore.update({uuid: device.uuid}, {$set: $set}, {upsert: true}, function (err, newDevice) {
            if (err) {
                RetroLogger.error(err);
                deferred.reject(RetroError.INTERNAL_ERROR);
            } else if (newDevice != null) {
                deferred.resolve(newDevice);
            } else {
                deferred.resolve(device);
            }
        });

        return deferred.promise;
    }

}