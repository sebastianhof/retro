/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/socket.io/socket.io.d.ts" />
/// <reference path="../typings/node-schedule/node-schedule.d.ts" />

import * as http from 'http';
import * as _ from 'lodash';
import * as socketio from 'socket.io';

var CronJob = require('cron').CronJob;

import {Store} from './stores/store';
import {RetroHub} from "./hub";
import {ActModel} from "./models/commandModel";
import {SenseModel} from "./models/commandModel";


export class RetroIoApi {
    io;

    static init(server:http.Server) {
        new RetroIoApi(server)
    }

    constructor(server:http.Server) {
        this.io = socketio(server);

        this.io.on('connection', function (socket) {

            // send devices, dashboard, items, locations, rules
            socket.emit('dashboard', {dashboardItems: Store.getState().dashboard});
            socket.emit('devices', {devices: Store.getState().devices});
            socket.emit('items', {items: Store.getState().items});
            socket.emit('locations', {locations: Store.getState().locations});
            socket.emit('rules', {rules: Store.getState().rules});

            new CronJob('*/10 * * * * *', () => {

                console.log('Updating device');

                socket.emit('dashboard', {dashboardItems: Store.getState().dashboard});
                socket.emit('devices', {devices: Store.getState().devices});
                socket.emit('items', {items: Store.getState().items});
                socket.emit('locations', {locations: Store.getState().locations});
                socket.emit('rules', {rules: Store.getState().rules});

            }, null, true);

        });

    }

}