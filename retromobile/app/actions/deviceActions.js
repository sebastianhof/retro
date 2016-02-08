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




}