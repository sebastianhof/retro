/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/q/Q.d.ts" />
import * as express from 'express';
import * as _ from 'lodash';
import * as q from 'q';
import {ItemDatastore} from "./../datastores/itemDatastore";
import {RetroError} from "../retro/utils";
import {ItemType} from "../models/itemModel";
import {ItemModel} from "../models/itemModel";

export class ItemsApi {

    constructor(app:express.Express) {

        /**
         * Get climate items
         *
         * GET /api/items/climate
         */
        app.get('/api/items/climate', function (req, res) {

            ItemDatastore.getInstance().getItems({type: {$in: [ItemType.THERMOSTAT, ItemType.WEATHERSTATION]}}).then(function (items:Array<ItemModel>) {
                res.send({
                    items: _.map(items, ItemsApi.toJson)
                });
            }, function (status:RetroError) {
                res.sendStatus(status);
            })

        });

        /**
         * Get lighting items
         *
         * GET /api/items/lighting
         */
        app.get('/api/items/lighting', function (req, res) {

            ItemDatastore.getInstance().getItems({type: {$in: [ItemType.LIGHT, ItemType.COLORLIGHT, ItemType.DIMMER, ItemType.COLORDIMMER]}}).then(function (items:Array<ItemModel>) {
                res.send({
                    items: _.map(items, ItemsApi.toJson)
                });
            }, function (status:RetroError) {
                res.sendStatus(status);
            })

        });

        /**
         * Get appliances items
         *
         * GET /api/items/appliances
         */
        app.get('/api/items/appliances', function (req, res) {

            ItemDatastore.getInstance().getItems({type: {$in: [ItemType.SWITCH, ItemType.BODYWEIGHT, ItemType.HEART_RATE_MONITOR]}}).then(function (items:Array<ItemModel>) {
                res.send({
                    items: _.map(items, ItemsApi.toJson)
                });
            }, function (status:RetroError) {
                res.sendStatus(status);
            })

        });

        /**
         * Get security items
         *
         * GET /api/items/security
         */
        app.get('/api/items/security', function (req, res) {

            ItemDatastore.getInstance().getItems({type: {$in: [ItemType.CCTV, ItemType.DOORLOCK, ItemType.WINDOW_CONTACT, ItemType.SMOKE_DETECTOR]}}).then(function (items:Array<ItemModel>) {
                res.send({
                    items: _.map(items, ItemsApi.toJson)
                });
            }, function (status:RetroError) {
                res.sendStatus(status);
            })

        });

        /**
         * Get outdoor items
         *
         * GET /api/items/outdoor
         */
        app.get('/api/items/outdoor', function (req, res) {

            ItemDatastore.getInstance().getItems({type: {$in: []}}).then(function (items:Array<ItemModel>) {
                res.send({
                    items: _.map(items, ItemsApi.toJson)
                });
            }, function (status:RetroError) {
                res.sendStatus(status);
            })

        });

        /**
         * Get car items
         *
         * GET /api/items/car
         */
        app.get('/api/items/car', function (req, res) {

            ItemDatastore.getInstance().getItems({type: {$in: [ItemType.GARAGE_DOOR]}}).then(function (items:Array<ItemModel>) {
                res.send({
                    items: _.map(items, ItemsApi.toJson)
                });
            }, function (status:RetroError) {
                res.sendStatus(status);
            })

        });

        app.get('/api/items/rooms/:roomId', function (req, res) {

            ItemDatastore.getInstance().getItems({locationId: req.params.roomId}).then(function (items:Array<ItemModel>) {
                res.send({
                    items: _.map(items, ItemsApi.toJson)
                });
            }, function (status:RetroError) {
                res.sendStatus(status);
            })

        });

        /**
         * Get items by deviceId
         *
         * GET /api/items/device/:deviceId
         */
        app.get('/api/items/device/:deviceId', function (req, res) {

            ItemDatastore.getInstance().getItems({deviceId: req.params.deviceId}).then(function (items:Array<ItemModel>) {
                res.send({
                    items: _.map(items, ItemsApi.toJson)
                });
            }, function (status:RetroError) {
                res.sendStatus(status);
            });

        });

        /**
         * Update item
         *
         * POST /api/items/:itemId
         */
        app.post('/api/items/:uuid', function (req, res) {

            var item:ItemModel = <ItemModel> {
                uuid: req.params.uuid,
                locationId: req.body.locationId,
                type: req.body.type,
                title: req.body.title
            };

            ItemDatastore.getInstance().upsertItem(item).then(function (item: ItemModel) {
                res.send(ItemsApi.toJson(item));
            }, function (status:RetroError) {
                res.sendStatus(status);
            });

        });

        /**
         * Command item
         *
         * POST /api/items/:itemId/command
         */
        app.post('/api/items/:uuid/command', function (req, res) {

            // TODO

        });

    }

    private static toJson(item:ItemModel) {
        return {
            id: item._id,
            uuid: item.uuid,
            deviceId: item.deviceId,
            locationId: item.locationId,
            type: item.type,
            title: item.title,
            values: item.values
        }
    }

}