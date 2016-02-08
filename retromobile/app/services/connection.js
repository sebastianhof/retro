import '../../useragent';

import io from 'socket.io-client/socket.io';

import {DeviceActions} from '../actions/deviceActions';
import {ItemActions} from '../actions/itemActions';
import {LocationActions} from '../actions/locationActions';
import {RuleActions} from '../actions/ruleActions';
import {DashboardActions} from '../actions/dashboardActions';

export class RetroConnection {

    static socket;

    static connect(protocol, host, port) {

        return new Promise((resolve, reject) => {

            fetch(`${protocol}${host}:${port}/api/connect`)
                .then(response => {
                    response.json()
                }, () => {
                    // not found
                    reject('Could not connect');

                }).then(json => {
                // found

                resolve('Connection established');

                let socket = io(`${protocol}${host}:${port}`, {jsonp: false});

                socket.on('devices', (data) => {
                    DeviceActions.receiveDevices(data.devices);
                });

                socket.on('dashboard', (data) => {
                    DashboardActions.receiveDashboard(data.dashboardItems);
                });

                socket.on('items', (data) => {
                    ItemActions.receiveItems(data.items);
                });

                socket.on('locations', (data) => {
                    LocationActions.receiveLocations(data.locations);
                });

                socket.on('rules', (data) => {
                    RuleActions.receiveRules(data.rules);
                });

                RetroConnection.socket = socket;

            });

        });

    }

}