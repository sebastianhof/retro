'use strict';
import {Store} from '../stores/store';

export const REQUEST_DEVICES = 'REQUEST_DEVICES';
export const RECEIVE_DEVICES = 'RECEIVE_DEVICES';

export class DeviceActions {

    static fetchDevices() {

        Store.dispatch({
            type: REQUEST_DEVICES
        });

        let connectionLink = Store.getState().settings.connectionLink;

        return fetch(`${connectionLink}/api/devices`)
            .then(response => response.json())
            .then(json => Store.dispatch({
                type: RECEIVE_DEVICES,
                data: json.devices
            }))

    }

}