/// <reference path="../typings/socket.io-client/socket.io-client.d.ts" />
/// <reference path="../typings/node-schedule/node-schedule.d.ts" />
import * as socketio from 'socket.io-client';

import {RetroHub} from "./hub";
import {ActModel} from "./models/commandModel";
import {Store} from "./stores/store";
import {SenseModel} from "./models/commandModel";

var CronJob = require('cron').CronJob;

let RETRO_HUB_DEMO_TOKEN = 'qeghU9Yrgb662pg2';

export class RetroCloud {
    static instance:RetroCloud;

    socket:SocketIOClient.Socket;

    constructor() {

        //this.socket = socketio('http://localhost:8081'); //
        this.socket = socketio('http://retrocloud.herokuapp.com');

        this.socket.on('act', function (data) {

            if (data.token == RETRO_HUB_DEMO_TOKEN) {

                let act:ActModel = data.act;

                RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: act.itemId}).then((item) => {

                    RetroHub.getInstance().dispatchJob(RetroHub.ACT_JOB, <ActModel> {
                        itemId: item.id,
                        deviceId: item.deviceId,
                        type: act.type,
                        value: act.value
                    }).then(() => {
                        this.socket.emit('items', {items: Store.getState().items});
                    }, () => {
                        this.socket.emit('items', {items: Store.getState().items});
                    });

                }, () => {
                    this.socket.emit('items', {items: Store.getState().items});
                });

            }

        });

        this.socket.on('sense', function (data) {

            if (data.token == RETRO_HUB_DEMO_TOKEN) {

                let sense:SenseModel = data.sense;

                RetroHub.getInstance().dispatchJob(RetroHub.FIND_ITEM_JOB, {id: sense.itemId}).then((item) => {

                    RetroHub.getInstance().dispatchJob(RetroHub.SENSE_JOB, <SenseModel> {
                        itemId: item.id,
                        deviceId: item.deviceId,
                    }).then(() => {
                        this.socket.emit('items', {items: Store.getState().items});
                    }, () => {
                        this.socket.emit('items', {items: Store.getState().items});
                    });

                }, () => {
                    this.socket.emit('items', {items: Store.getState().items});
                });

            }

        });

        this.socket.emit('register', {
            token: RETRO_HUB_DEMO_TOKEN
        });

        new CronJob('*/60 * * * * *', () => {

            console.log('Updating Retro cloud');

            // send devices, dashboard, items, locations, rules
            this.socket.emit('dashboard', {
                token: RETRO_HUB_DEMO_TOKEN,
                dashboardItems: Store.getState().dashboard
            });
            this.socket.emit('devices', {
                token: RETRO_HUB_DEMO_TOKEN,
                devices: Store.getState().devices
            });
            this.socket.emit('items', {
                token: RETRO_HUB_DEMO_TOKEN,
                items: Store.getState().items
            });
            this.socket.emit('locations', {
                token: RETRO_HUB_DEMO_TOKEN,
                locations: Store.getState().locations
            });
            this.socket.emit('rules', {
                token: RETRO_HUB_DEMO_TOKEN,
                rules: Store.getState().rules
            });

        }, null, true);

    }

    static getInstance() {
        if (RetroCloud.instance == null) {
            RetroCloud.instance = new RetroCloud();
        }
        return RetroCloud.instance;
    }

    static init() {
        if (RetroCloud.instance == null) {
            RetroCloud.instance = new RetroCloud();
        }
    }

}