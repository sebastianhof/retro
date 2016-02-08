'use strict';
import {Store} from '../stores/store';
import React from  'react-native';
import {DeviceActions, RECEIVE_DEVICES} from './deviceActions';
import {ItemActions, RECEIVE_ITEMS} from './itemActions';
import {LocationActions, RECEIVE_LOCATIONS} from './locationActions';
import {RuleActions, RECEIVE_RULES} from './ruleActions';
import {DashboardActions, RECEIVE_DASHBOARD} from './dashboardActions';

import {RetroConnection} from '../services/connection';

export const CONNECTING_TO_HUB = 'CONNECTING_TO_HUB';
export const CONNECTED_TO_HUB = 'CONNECTED_TO_HUB';
export const NOT_CONNECTED_TO_HUB = 'NOT_CONNECTED_TO_HUB';
export const NOT_FOUND_HUB = 'NOT_FOUND_HUB';
export const CONNECTED_TO_CLOUD = 'CONNECTED_TO_CLOUD';
export const SET_USE_CLOUD = 'SET_USE_CLOUD';
export const SET_CLOUD_ACCESS_TOKEN = 'SET_CLOUD_ACCESS_TOKEN';
export const SET_HUB_HOST = 'SET_HUB_HOST';
export const SET_CONNECTION_LINK = 'SET_CONNECTION_LINK';

export class SettingsActions {

    static connection: io.Socket;

    static connectToHub() {
        let protocol = Store.getState().settings.hubProtocol;
        let host = Store.getState().settings.hubHost;
        let port = Store.getState().settings.hubPort;

        Store.dispatch({
            type: CONNECTING_TO_HUB
        });

        RetroConnection.connect(protocol, host, port).then(() => {
            console.log('connected');

            // connected to hub
            Store.dispatch({
                type: SET_CONNECTION_LINK,
                value: `${protocol}${host}:${port}`
            });

            Store.dispatch({
                type: CONNECTED_TO_HUB
            });
        }, () => {
            // not connected
            Store.dispatch({
                type: NOT_FOUND_HUB
            });
        });

    }

    static connectToCloud() {
        let protocol = Store.getState().settings.cloudProtocol;
        let host = Store.getState().settings.cloudHost;
        let port = Store.getState().settings.cloudPort;

        Store.dispatch({
            type: CONNECTING_TO_HUB
        });

        RetroConnection.connect(protocol, host, port).then(() => {
            // connected to cloud
            Store.dispatch({
                type: SET_CONNECTION_LINK,
                value: `${protocol}${host}:${port}`
            });

            Store.dispatch({
                type: CONNECTED_TO_CLOUD
            });
        }, () => {
            // not connected
            Store.dispatch({
                type: NOT_FOUND_HUB
            });
        });

    }

    static disconnectFromHub() {

        Store.dispatch({
            type: NOT_CONNECTED_TO_HUB
        });

    }

    /*
     * Setup connection
     */

    static setHubHost(hostName) {

        Store.dispatch({
            type: SET_HUB_HOST,
            value: hostName
        })

    }

    static setUseCloud(value) {

        Store.dispatch({
            type: SET_USE_CLOUD,
            value: value
        })

    }

    static setCloudAccessToken(accessToken) {

        Store.dispatch({
            type: SET_CLOUD_ACCESS_TOKEN,
            value: accessToken
        })

    }

}