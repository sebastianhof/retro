'use strict';
import {Store} from '../stores/store';
import React from  'react-native';
import {ItemActions} from './itemActions';
import {LocationActions} from './locationActions';

var {
    StatusBarIOS
    } = React;

export const CONNECTING_TO_HUB = 'CONNECTING_TO_HUB';
export const CONNECTED_TO_HUB = 'CONNECTED_TO_HUB';
export const NOT_CONNECTED_TO_HUB = 'NOT_CONNECTED_TO_HUB';
export const NOT_FOUND_HUB = 'NOT_FOUND_HUB';
export const CONNECTED_TO_CLOUD = 'CONNECTED_TO_CLOUD';
export const SET_USE_CLOUD = 'SET_USE_CLOUD';
export const SET_CLOUD_ACCESS_TOKEN = 'SET_CLOUD_ACCESS_TOKEN';
export const SET_HUB_HOST = 'SET_HUB_HOST';

export class SettingsActions {

    static connect(protocol, host, port, isConnectedToCloud) {

        Store.dispatch({
            type: CONNECTING_TO_HUB
        });

        StatusBarIOS.setNetworkActivityIndicatorVisible(true);

        // api call
        fetch(`${protocol}${host}:${port}/api/connect`)
            .then(response => {
                response.json()
            }, () => {

                Store.dispatch({
                    type: NOT_FOUND_HUB
                });

                StatusBarIOS.setNetworkActivityIndicatorVisible(false);

            })
            .then(json => {
                // TODO add token and id;
                Promise.all([
                    LocationActions.fetchLocations(protocol, host, port),
                    ItemActions.fetchItems(protocol, host, port)
                ]).then(() => {

                    if (isConnectedToCloud) {

                        Store.dispatch({
                            type: CONNECTED_TO_CLOUD
                        });

                    } else {

                        Store.dispatch({
                            type: CONNECTED_TO_HUB
                        });

                    }

                    StatusBarIOS.setNetworkActivityIndicatorVisible(false);

                });
            });

    }

    static connectToHub() {

        let protocol = Store.getState().settings.hubProtocol;
        let host = Store.getState().settings.hubHost;
        let port = Store.getState().settings.hubPort;

        SettingsActions.connect(protocol, host, port, false);

    }

    static connectToCloud() {

        let protocol = Store.getState().settings.cloudProtocol;
        let host = Store.getState().settings.cloudHost;
        let port = Store.getState().settings.cloudPort;

        SettingsActions.connect(protocol, host, port, true);

    }

    static disconnectFromHub() {

        Store.dispatch({
            type: NOT_CONNECTED_TO_HUB
        });

    }

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