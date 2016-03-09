'use strict';
import {Store} from '../stores/store';

export const REQUEST_DEVICES = 'REQUEST_DEVICES';
export const RECEIVE_DEVICES = 'RECEIVE_DEVICES';

export class DeviceActions {

    static receiveDevices(devices) {

        Store.dispatch({
            type: RECEIVE_DEVICES,
            data: devices
        });

    }

    static removeDevice(deviceId) {

        let connectionLink = Store.getState().settings.connectionLink;

        fetch(`${connectionLink}/api/devices/${deviceId}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            DeviceActions.receiveDevices(data.devices);
        });


    }


}