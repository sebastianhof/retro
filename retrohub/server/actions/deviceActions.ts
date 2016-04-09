'use strict';
import {Store} from '../stores/store';
import {DeviceModel} from '../models/deviceModel';

export const ADD_DEVICE = 'ADD_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';

export class DeviceActions {

    static addDevice(device:DeviceModel) {

        Store.dispatch({
            type: ADD_DEVICE,
            value: device
        });

    }

    static removeDevice(deviceId:string) {

        Store.dispatch({
            type: REMOVE_DEVICE,
            value: deviceId
        });

    }

    static updateDevice(device:DeviceModel) {

        Store.dispatch({
            type: UPDATE_DEVICE,
            value: device
        });

    }

}