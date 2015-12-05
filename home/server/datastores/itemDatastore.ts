/// <reference path="../../typings/nedb/nedb.d.ts" />
/// <reference path="../../typings/q/Q.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
import * as _ from 'lodash';
import * as q from 'q';
import {RetroLogger} from "../retro/utils";
import {RetroError} from "../retro/utils";
import {DeviceDatastore} from "./deviceDatastore";
import {ItemModel} from "../models/itemModel";
var Datastore = require('nedb');

export class ItemDatastore {
    private static instance:ItemDatastore;
    private datastore;

    constructor() {
        this.datastore = new Datastore();
    }

    static getInstance():ItemDatastore {
        if (ItemDatastore.instance == null) {
            ItemDatastore.instance = new ItemDatastore();
        }
        return ItemDatastore.instance;
    }

    /**
     *
     * Get items
     *
     * @param query
     * @returns {Promise<T>}
     */
    public getItems(query:any) {
        var deferred = q.defer();

        this.datastore.find(query, function (err, docs) {
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
     * Add or update item
     *
     * @param item
     * @returns {Promise<T>}
     */
    public upsertItem(item:ItemModel) {
        var deferred = q.defer();

        var $set:any = {};
        if (item.uuid != null) $set['uuid'] = item.uuid;
        if (item.deviceId != null) $set['deviceId'] = item.deviceId;
        if (item.locationId != null) $set['locationId'] = item.locationId;
        if (item.type != null) $set['type'] = item.type;
        if (item.category != null) $set['category'] = item.category;
        if (item.title != null) $set['title'] = item.title;

        _.forEach(<any> item.values, function (n, key) {
            $set['values.' + key] = n;
        });

        this.datastore.update({uuid: item.uuid}, {$set: $set}, {upsert: true}, function (err, newItem) {
            if (err) {
                RetroLogger.error(err);
                deferred.reject(RetroError.INTERNAL_ERROR);
            } else if (newItem != null) {
                deferred.resolve(newItem);
            } else {
                deferred.resolve(item)
            }
        });

        return deferred.promise;
    }


}