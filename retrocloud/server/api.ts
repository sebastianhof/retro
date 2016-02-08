/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
import * as express from 'express';
import * as _ from 'lodash';

import {RetroUUID} from "./utils";
import {Store} from "./stores/store";
import {ActModel, SenseModel} from "./models/commandModel";
import {RetroCloudIoAPI} from "./api-io";

var jwt = require('jsonwebtoken');

export class RetroCloudAPI {

    static init(app:express.Express) {
        new RetroCloudAPI(app);
    }

    constructor(app:express.Express) {

        /*
         * Connect
         */

        app.get('/api/connect', function (req, res) {
            res.send({
                    id: RetroUUID.generateUUID(),
                    token: jwt.sign({}, 'retro')
                }
            );
        });

        app.get('/api/dashboard', (req, res) => res.send({dashboardItems: Store.getState().dashboard}));

        /*
         * Devices
         */

        app.get('/api/devices', (req, res) => res.send({devices: Store.getState().devices}));

        /*
         * Items
         */

        app.get('/api/items', (req, res) => res.send({items: Store.getState().items}));

        app.post('/api/items/:itemId/act', (req, res) => {

            var item = _.find(Store.getState().items, {id: req.params.itemId});
            if (item != null) {

                var act = <ActModel> {
                    itemId: item.id,
                    deviceId: item.deviceId,
                    type: req.body.type,
                    value: req.body.value
                };

                RetroCloudIoAPI.getInstance().delegateAct(act);
                res.send('ok');

            } else {
                res.status(400).send("item not found");
            }


        });

        app.post('/api/items/:itemId/sense', (req, res) => {

            var item = _.find(Store.getState().items, {id: req.params.itemId});
            if (item != null) {

                var sense = <SenseModel>{
                    itemId: item.id,
                    deviceId: item.deviceId
                };

                RetroCloudIoAPI.getInstance().delegateSense(sense);
                res.send('ok');

            } else {
                res.status(400).send("item not found");
            }

        });


        /*
         * Locations
         */

        app.get('/api/locations', (req, res) => res.send({locations: Store.getState().locations}));

        /*
         * Rules
         */

        app.get('/api/rules', (req, res) => res.send({rules: Store.getState().rules}));


    }
}