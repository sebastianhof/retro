/// <reference path="typed/express/express.d.ts" />
/// <reference path="typed/lodash/lodash.d.ts" />
/// <reference path="typed/q/Q.d.ts" />
import * as express from 'express';
import * as _ from 'lodash';
import * as q from 'q';
import {ItemDatastore, ItemType} from "./datastores/itemDatastore";

export class Items {

    constructor(app:express.Express) {

        app.get('/api/items/climate', function (req, res, next) {

            ItemDatastore.getInstance().getItems({type: {$in: [ItemType.THERMOSTAT, ItemType.WEATHERSTATION]}}).then(function (items) {
                res.send({
                    items: items
                });
            }, function (err) {
                res.sendStatus(500);
            })

        });
    }

}