/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/passport/passport.d.ts" />
import * as _ from 'lodash';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
import * as util from 'util';

import {Store} from './stores/store';

import {ItemActions} from './actions/itemActions';
import {DashboardActions} from './actions/dashboardActions';
import {LocationActions} from './actions/locationActions';
import {RuleActions} from './actions/ruleActions';

import {ItemModel} from './models/itemModel';
import {LocationModel} from './models/locationModel';
import {RuleModel} from './models/ruleModel';
import {UserModel, UserRole} from "./models/userModel";

import {RetroUUID} from "./utils";
import {RetroHub} from "./hub";
import {ConfigurationModel} from "./models/commandModel";
import {ConfigurationType} from "./models/commandModel";
import {ActModel, SenseModel} from "./models/commandModel";
import {DeviceActions} from "./actions/deviceActions";

var jwt = require('jsonwebtoken');


export class RetroAPI {

    static init(app:express.Express) {
        new RetroAPI(app);
    }

    hasErrors(req:express.Request, res:express.Response) {
        var errors = req.validationErrors();
        if (errors) {
            console.log(util.inspect(errors));
            res.status(400).send('There have been validation errors: ' + util.inspect(errors));
            return true;
        } else {
            return false;
        }
    }

    constructor(app:express.Express) {

        // TODO: hash ids

        /*
         * Client
         */
        //app.get('/', (req, res) => {
        //    if (req.isAuthenticated()) {
        //        res.sendFile(path.join(__dirname, '../dist/app/app.html'));
        //    } else {
        //        res.sendFile(path.join(__dirname, '../dist/public/public.html'));
        //    }
        //});

        //app.use(express.static(path.join(__dirname, '../dist/app')));
        //app.use(express.static(path.join(__dirname, '../dist/public')));

        /*
         * Connect
         */

        app.get('/api/connect', (req, res) => {
            res.send({
                    id: RetroUUID.generateUUID(),
                    token: jwt.sign({}, 'retro')
                }
            );
        });

        /*
         * Dashboard
         */

        app.get('/api/dashboard', (req, res) => res.send({dashboardItems: Store.getState().dashboard}));

        app.post('/api/dashboard', (req, res) => {
            DashboardActions.addDashboardItem(null);
            res.send({dashboardItems: Store.getState().dashboard})
        });

        app.delete('/api/dashboard/:dashboardItemId', (req, res) => {
            DashboardActions.removeDashboardItem(req.params['dashboardItemId']);
            res.send({dashboardItems: Store.getState().dashboard})
        });

        /*
         * Devices
         */

        app.get('/api/devices', (req, res) => res.send({devices: Store.getState().devices}));

        app.post('/api/devices/:deviceId/configure', (req, res) => {
            req.checkParams('deviceId', 'Invalid device id').notEmpty();
            if (this.hasErrors(req, res)) return;

            RetroHub.getInstance().dispatchJob(RetroHub.CONFIGURE_JOB, <ConfigurationModel> {
                deviceId: req.params.deviceId,
                type: req.body.type,
                values: req.body.values
            }).then(() => res.send("ok"), (err) => res.status(400).send(err));

        });

        app.delete('/api/devices/:deviceId', (req, res) => {
            req.checkParams('deviceId', 'Invalid device id').notEmpty();
            if (this.hasErrors(req, res)) return;

            RetroHub.getInstance().dispatchJob(RetroHub.FIND_DEVICE_JOB, {id: req.params.deviceId}).then((device) => {

                // unregister device from retro hub
                let registeredDevice = RetroHub.getInstance().getDevice(device.id);
                if (RetroHub.getInstance().unregisterDevice(registeredDevice)) {

                    // delete all items
                    let itemIds = _.pluck(_.filter(Store.getState().items, {deviceId: device.id}), 'id');
                    _.forEach(itemIds, (itemId) => {
                        ItemActions.removeItem(itemId);
                    });

                    // delete device
                    DeviceActions.removeDevice(device.id);

                    res.send({devices: Store.getState().devices});

                } else {

                    res.status(400).send("could not unregister device");

                }


            }, () => {
                res.status(400).send("device not found");
            });

        });

        /*
         * Items
         */

        app.get('/api/items', (req, res) => res.send({items: Store.getState().items}));

        app.post('/api/items/:itemId', (req, res) => {
            req.checkParams('itemId', 'Invalid item id').notEmpty();
            req.checkBody('title', 'Invalid title').notEmpty();
            req.checkBody('locationId', 'Invalid locationId').notEmpty();
            req.checkBody('isFavorite', 'Invalid isFavorite').notEmpty();

            if (this.hasErrors(req, res)) return;

            RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: req.params.itemId}).then((item) => {

                console.log(req.body);

                item.title = req.body.title;
                item.locationId = req.body.locationId;
                item.isFavorite = req.body.isFavorite;

                ItemActions.updateItem(item);
                res.send({items: Store.getState().items});
            }, () => {
                res.status(400).send("item not found");
            });

        });

        app.post('/api/items/:itemId/act', (req, res) => {
            req.checkParams('itemId', 'Invalid item id').notEmpty();
            if (this.hasErrors(req, res)) return;

            RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: req.params.itemId}).then((item) => {

                var data = <ActModel> {
                    itemId: item.id,
                    deviceId: item.deviceId,
                    type: req.body.type,
                    value: req.body.value
                };

                RetroHub.getInstance().dispatchJob(RetroHub.ACT_JOB, data).then(() => res.send("ok"), (err) => res.status(400).send(err));


            }, () => {
                res.status(400).send("item not found");
            });

        });

        app.post('/api/items/:itemId/sense', (req, res) => {
            req.checkParams('itemId', 'Invalid item id').notEmpty();
            if (this.hasErrors(req, res)) return;

            RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: req.params.itemId}).then((item) => {

                var data = <SenseModel> {
                    itemId: item.id,
                    deviceId: item.deviceId
                };

                RetroHub.getInstance().dispatchJob(RetroHub.SENSE_JOB, data).then(() => res.send("ok"), (err) => res.status(400).send(err));

            }, () => {
                res.status(400).send("item not found");
            });

        });

        /*
         * Locations
         */

        app.get('/api/locations', (req, res) => res.send({locations: Store.getState().locations}));

        app.post('/api/locations', (req, res) => {
            req.checkBody('title', 'Invalid title').notEmpty();
            req.checkBody('type', 'Invalid type').notEmpty();
            if (this.hasErrors(req, res)) return;

            let location:LocationModel = <LocationModel> {
                id: RetroUUID.generateUUID(),
                title: req.body.title,
                type: req.body.type
            };

            LocationActions.addLocation(location);
            res.send({locations: Store.getState().locations});
        });

        app.post('/api/locations/:locationId', (req, res) => {
            req.checkParams('locationId', 'Invalid location id').notEmpty();
            req.checkBody('title', 'Invalid title').notEmpty();
            req.checkBody('type', 'Invalid type').notEmpty();
            if (this.hasErrors(req, res)) return;

            let location:LocationModel = <LocationModel> {
                id: req.params['locationId'],
                title: req.body.title,
                type: req.body.type
            };

            LocationActions.updateLocation(location);
            res.send({locations: Store.getState().locations});
        });

        app.delete('/api/locations/:locationId', (req, res) => {
            req.checkParams('locationId', 'Invalid location id').notEmpty();
            if (this.hasErrors(req, res)) return;

            LocationActions.removeLocation(req.params['locationId']);
            res.send({locations: Store.getState().locations});
        });

        /*
         * Rules
         */

        app.get('/api/rules', (req, res) => res.send({rules: Store.getState().rules}));

        app.post('/api/rules', (req, res) => {
            let rule:RuleModel = <RuleModel> {
                id: RetroUUID.generateUUID()
            };

            RuleActions.addRule(rule);
            res.send({rules: Store.getState().rules});
        });

        app.post('/api/rules/:ruleId', (req, res) => {
            let rule:RuleModel = <RuleModel> {
                id: req.params['ruleId'],
            };

            RuleActions.updateRule(rule);
            res.send({rules: Store.getState().rules});
        });

        app.delete('/api/rules/:ruleId', (req, res) => {
            req.checkParams('ruleId', 'Invalid rule id').notEmpty();
            if (this.hasErrors(req, res)) return;

            RuleActions.removeRule(req.params['ruleId']);
            res.send({rules: Store.getState().rules});
        });

        /*
         * Users
         */

        /**
         * Sign in
         *
         * GET /api/signin
         */
        app.post('/api/signin', passport.authenticate('local', {
            successRedirect: '/#/dashboard',
            failureRedirect: '/#/signinError'
        }));

        /**
         * Sign out
         *
         * GET /api/signout
         */
        app.get('/api/signout', (req, res) => {
            req.logout();
            res.redirect('/');
        });

        /**
         * Get current user
         *
         * GET /api/user
         */
        app.get('/api/user', RetroAuth.isAuthenticated, (req, res) => {
            res.send(req.user);
        });

        /*
         * Streaming api for cctv
         */
        app.get('/api/items/:itemId/stream/play.m3u8', (req, res) => {

            let item:any = _.find(Store.getState().items, {id: req.params.itemId});
            if (item != null) {

                let values = item.values;
                if (values.streamingUrl != null) {

                    var hls = require('hls-buffer');
                    var buffer = hls(values.streamingUrl);

                    buffer.playlist(function (err, pl) {

                        if (err) {
                            res.sendStatus(500);
                        }
                        else {
                            pl = pl.replace(/\//g, `/api/items/${req.params.itemId}/stream/`);
                            //res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
                            res.end(pl);
                        }


                    });

                } else {
                    res.sendStatus(404);
                }

            } else {
                res.sendStatus(404);
            }

        });

        app.get('/api/items/:itemId/stream/:file', (req, res) => {

            let item:any = _.find(Store.getState().items, {id: req.params.itemId});
            if (item != null) {

                let values = item.values;
                if (values.streamingUrl != null) {

                    var hls = require('hls-buffer');
                    var buffer = hls(values.streamingUrl);
                    buffer.playlist(function (err, pl) {

                        if (err) {
                            res.sendStatus(500);
                        } else {

                            var stream = buffer.segment('/' + req.params.file);
                            if (stream != null) {
                                console.log('streaming');
                                //res.setHeader('Content-Type', 'video/mp2s');
                                stream.pipe(res);
                            } else {
                                res.sendStatus(500);
                            }

                        }

                    });


                } else {
                    res.sendStatus(404);
                }

            } else {
                res.sendStatus(404);
            }

        });

        app.get('/api/items/:itemId/capture.jpg', (req, res) => {

            let item:any = _.find(Store.getState().items, {id: req.params.itemId});
            if (item != null) {

                let values = item.values;
                if (values.snapshotUrl != null) {

                    if (values.snapshotUrl.indexOf('https') > -1) {

                        https.get(values.snapshotUrl, (image) => {

                            image.pipe(res);
                            //res.send(image);
                        });


                    } else {

                        http.get(values.snapshotUrl, (image) => {

                            image.pipe(res);
                            //res.send(image);
                        });


                    }


                } else {
                    res.sendStatus(404);
                }

            } else {
                res.sendStatus(404);
            }

        });

    }

}

class RetroAuth {

    public static isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.send(401);
        }
    }

    public static isAdmin(req, res, next) {
        if (req.user && req.user.role == UserRole.ADMIN) {
            return next();
        } else {
            return res.send(401);
        }
    }

}