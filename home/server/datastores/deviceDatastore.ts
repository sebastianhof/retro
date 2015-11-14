/// <reference path="../typed/nedb/nedb.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
/// <reference path="../typed/lodash/lodash.d.ts" />
import * as _ from 'lodash';
import * as q from 'q';
var Datastore = require('nedb');

export enum DeviceType {
    MAXCUBE = 0
}

export interface DeviceModel {
    _id?: string,
    title: string,
    type: DeviceType,
    values: any
}

export class DeviceDatastore {
    private static instance;
    private datastore;

    constructor() {
        this.datastore = new Datastore();
    }

    static getInstance() {
        if (DeviceDatastore.instance == null) {
            DeviceDatastore.instance = new DeviceDatastore();
        }
        return DeviceDatastore.instance;
    }

    static init() {
        if (DeviceDatastore.instance == null) {
            DeviceDatastore.instance = new DeviceDatastore();
        }
    }

    public addDevice(device:DeviceModel) {
        var deferred = q.defer();

        this.datastore.insert(device, function (err, doc) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    public getDevices() {
        var deferred = q.defer();

        this.datastore.find({}, function (err, docs) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(docs);
            }
        });

        return deferred.promise;
    }

    public getDevice(query:any) {
        var deferred = q.defer();

        this.datastore.findOne(query, function (err, doc) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

}