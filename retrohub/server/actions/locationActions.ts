'use strict';
import {Store} from '../stores/store';
import {LocationModel} from '../models/locationModel';

export const ADD_LOCATION = 'ADD_LOCATION';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export class LocationActions {

    static addLocation(location:LocationModel) {

        Store.dispatch({
            type: ADD_LOCATION,
            value: location
        });

    }

    static removeLocation(locationId: string) {

        Store.dispatch({
            type: REMOVE_LOCATION,
            value: locationId
        });

    }

    static updateLocation(location: LocationModel) {

        Store.dispatch({
            type: UPDATE_LOCATION,
            value: location
        });

    }

}