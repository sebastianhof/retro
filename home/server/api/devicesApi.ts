/// <reference path="../typed/express/express.d.ts" />
/// <reference path="../typed/lodash/lodash.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
import * as express from 'express';
import * as _ from 'lodash';
import * as q from 'q';

import {Maxcube} from './../devices/maxcube'
import {IDevice} from "./../devices/idevice";
import {RetroHub} from "./../retro/hub";
import {ItemDatastore} from "./../datastores/itemDatastore";
import {DeviceDatastore} from "./../datastores/deviceDatastore";
import {RetroError} from "../retro/utils";

/**
 * Device management
 */
export class DevicesApi {

    constructor(app:express.Express) {

        /**
         * Get devices
         *
         * GET /api/devices
         */
        app.get('/api/devices', function (req, res, next) {

            DeviceDatastore.getInstance().getDevices().then(function (devices) {
                res.send({devices: devices});
            }, function (status:RetroError) {
                res.sendStatus(status);
            });

        });

        /**
         * Edit device
         *
         * POST /api/devices/:deviceId
         */
        app.post('/api/devices/:uuid', function (req, res) {

            // TODO

        });

        /**
         * Setup devices
         */
        app.use('/api/devices/setup', this.devicesSetup());

    }

    private devicesSetup():express.Router {
        var router = express.Router();
        var deviceDatastore = DeviceDatastore.getInstance();
        var retroHub = RetroHub.getInstance();

        var sendDevice = function (deviceId, res) {

            deviceDatastore.getDevice(deviceId).then(function (device) {
                if (device != null) {
                    res.send(device);
                } else {
                    res.sendStatus(404);
                }

            }, function (err) {
                res.sendStatus(500);
            });

        };

        /**
         * Setup Max!Cube
         *
         * POST /api/devices/setup/maxcube
         */
        router.post('/maxcube', function (req, res, next) {

            Maxcube.setup(req.body.ip).then(function () {
                retroHub.once(Maxcube.STATUS_UPDATE_EVENT, function (deviceId) {
                    sendDevice(deviceId, res);
                });
                retroHub.once(Maxcube.CLOSED_EVENT, function () {
                    res.sendStatus(404);
                });
            }, function (status) {
                res.sendStatus(status);
            });

        });


        /**
         * Setup Philips Hue
         *
         * POST /api/devices/setup/philipshue
         */
        router.post('/philipshue', function (req, res, next) {

        });

        /**
         * Setup Lifx
         *
         * POST /api/devices/setup/lifx
         */
        router.post('/lifx', function (req, res, next) {

        });

        /**
         * Setup Belkin Wemo
         *
         * POST /api/devices/setup/wemo
         */
        router.post('/wemo', function (req, res, next) {

        });

        /**
         * Setup Withings
         *
         * POST /api/devices/setup/withings
         */
        router.post('/withings', function (req, res, next) {

        });

        return router;
    }

}