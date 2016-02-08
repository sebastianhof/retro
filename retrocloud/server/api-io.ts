/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/socket.io/socket.io.d.ts" />
/// <reference path="../typings/node-schedule/node-schedule.d.ts" />
import * as socketio from 'socket.io';
import * as schedule from 'node-schedule';
import * as _ from 'lodash';
import * as http from 'http';
import {Store} from "./stores/store";
import {ActModel} from "./models/commandModel";
import {SenseModel} from "./models/commandModel";

let RETRO_HUB_DEMO_TOKEN = 'qeghU9Yrgb662pg2';

export class RetroCloudIoAPI {
    static instance;
    private io;
    private demoHubSocket;

    constructor(server:http.Server) {
        this.io = socketio(server);

        this.io.on('connection', (socket) => {

            /*
             * Retro hub
             */
            socket.on('register', (data) => {

                if (data.token == RETRO_HUB_DEMO_TOKEN) {
                    console.log('Registered hub ' + data.token);
                    this.demoHubSocket = socket;
                }

            });

            socket.on('dashboard', (data) => {

                if (data.token == RETRO_HUB_DEMO_TOKEN) {
                    Store.setState('dashboard', data.dashboardItems);
                    socket.broadcast.emit('dashboard', data.dashboardItems);
                }


            });

            socket.on('devices', (data) => {

                if (data.token == RETRO_HUB_DEMO_TOKEN) {
                    Store.setState('devices', data.devices);
                    socket.broadcast.emit('devices', data.devices);
                }

            });

            socket.on('items', (data) => {

                if (data.token == RETRO_HUB_DEMO_TOKEN) {
                    Store.setState('items', data.items);
                    socket.broadcast.emit('items', data.items);
                }

            });

            socket.on('locations', (data) => {

                if (data.token == RETRO_HUB_DEMO_TOKEN) {
                    Store.setState('locations', data.locations);
                    socket.broadcast.emit('locations', data.locations);
                }

            });

            socket.on('rules', (data) => {

                if (data.token == RETRO_HUB_DEMO_TOKEN) {
                    Store.setState('rules', data.rules);
                    socket.broadcast.emit('rules', data.rules);
                }

            });

            /*
             * Retro client
             */

            // send devices, dashboard, items, locations, rules
            socket.emit('dashboard', {dashboardItems: Store.getState().dashboard});
            socket.emit('devices', {devices: Store.getState().devices});
            socket.emit('items', {items: Store.getState().items});
            socket.emit('locations', {locations: Store.getState().locations});
            socket.emit('rules', {rules: Store.getState().rules});

        });
    }

    delegateAct(act: ActModel) {

        this.demoHubSocket.emit('act', {
            token: RETRO_HUB_DEMO_TOKEN,
            act: act
        });
    }

    delegateSense(sense: SenseModel) {
        this.demoHubSocket.emit('sense', {
            token: RETRO_HUB_DEMO_TOKEN,
            sense: sense
        });
    }

    static init(server:http.Server) {
        if (RetroCloudIoAPI.instance == null) {
            RetroCloudIoAPI.instance = new RetroCloudIoAPI(server)
        }
    }

    static getInstance() {
        return RetroCloudIoAPI.instance;
    }



}