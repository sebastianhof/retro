/// <reference path="typed/express/express.d.ts" />
import * as express from 'express';

/**
 * Device management
 */
export class Devices {

    constructor(app: express.Express) {


        app.use('/devices/setup', this.devicesSetup());

    }

    private devicesSetup(): express.Router {
        var router = express.Router();

        router.get('devices', function(req, res, next) {

        });

        // autodetect
        router.post('/auto', function(res, req, next) {

        });

        // climate
        router.post('/maxcube', function(res, req, next) {

        });

        // lighting
        router.post('/philipshue', function(res, req, next) {

        });

        router.post('/lifx', function(res, req, next) {

        });

        // appliances
        router.post('/withings', function(res, req, next) {

        });

        return router;
    }

}