/// <reference path="../../typings/nedb/nedb.d.ts" />
/// <reference path="../../typings/q/Q.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
import * as _ from 'lodash';
import * as q from 'q';
import {RetroError, RetroLogger} from '../retro/utils'
import {LocationModel} from "../models/locationModel";
var Datastore = require('nedb');

export class LocationDatastore {
    private static instance:LocationDatastore;
    private datastore;

    constructor() {
        this.datastore = new Datastore();
    }

    static getInstance():LocationDatastore {
        if (LocationDatastore.instance == null) {
            LocationDatastore.instance = new LocationDatastore();
        }
        return LocationDatastore.instance;
    }

    /**
     *
     * Get locations
     *
     * @returns {Promise<T>}
     */
    public getLocations() {
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
     * Add location
     *
     * @param location
     * @returns {Promise<T>}
     */
    public addLocation(location:LocationModel) {
        var deferred = q.defer();

        this.datastore.insert(location, function (err, doc) {
            if (err) {
                RetroLogger.error(err);
                deferred.reject(RetroError.INTERNAL_ERROR);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * Update location
     *
     * @param location
     * @returns {Promise<T>}
     */
    public updateLocation(location:LocationModel) {
        var deferred = q.defer();

        var $set:any = {};
        if (location.type != null) $set['type'] = location.type;
        if (location.title != null) $set['title'] = location.title;

        this.datastore.update({_id: location._id}, {$set: $set}, function (err) {
            if (err) {
                RetroLogger.error(err);
                deferred.reject(RetroError.INTERNAL_ERROR);
            } else {
                deferred.resolve(location);
            }
        });

        return deferred.promise;
    }

}