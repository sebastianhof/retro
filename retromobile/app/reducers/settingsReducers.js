'use strict';
var _ = require('lodash');

import {HubConnectionStatus} from '../models/settingsModel';
import {CONNECTING_TO_HUB, CONNECTED_TO_HUB, NOT_CONNECTED_TO_HUB, NOT_FOUND_HUB, CONNECTED_TO_CLOUD, NOT_CONNECTED_TO_CLOUD, SET_USE_CLOUD, SET_HUB_HOST} from '../actions/settingsActions';

//var {
//    AsyncStorage
//    } = React;
//
//const STORAGE_HUB_HOST = 'STORAGE_HUB_HOST';
//
//var storedHubHost; //= AsyncStorage.getItem(STORAGE_HUB_HOST);
//if (storedHubHost == null) {
//    storedHubHost = 'localhost';
//}

export function settings(state = {
    hubConnectionStatus: HubConnectionStatus.NOT_CONNECTED,
    hubProtocol: 'http://',
    hubHost: 'localhost',
    hubPort: 8080,
    useCloud: true,
    cloudProtocol: 'http://',
    cloudHost: 'retrocloud.herokuapp.com',
    cloudPort: 80,
    lastConnectionDate: null
}, action = null) {

    switch (action.type) {

        case CONNECTING_TO_HUB:
            return _.assign({}, state, {hubConnectionStatus: HubConnectionStatus.CONNECTING});
        case CONNECTED_TO_HUB:
            return _.assign({}, state, {
                hubConnectionStatus: HubConnectionStatus.CONNECTED,
                lastConnectionDate: Date.now()
            });
        case CONNECTED_TO_CLOUD:
            return _.assign({}, state, {
                hubConnectionStatus: HubConnectionStatus.CONNECTED_TO_CLOUD,
                lastConnectionDate: Date.now()
            });
        case NOT_CONNECTED_TO_HUB:
            return _.assign({}, state, {hubConnectionStatus: HubConnectionStatus.NOT_CONNECTED});
        case NOT_FOUND_HUB:
            return _.assign({}, state, {hubConnectionStatus: HubConnectionStatus.NOT_FOUND});
        case SET_HUB_HOST:
            return _.assign({}, state, {hubHost: action.value});
        case SET_USE_CLOUD:
            return _.assign({}, state, {useCloud: action.value});
        default:
            return state;
    }

}