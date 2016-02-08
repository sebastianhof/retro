'use strict';
import {Store} from '../stores/store';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';

export class LocationActions {

    static receiveLocations(locations) {

        Store.dispatch({
            type: RECEIVE_LOCATIONS,
            data: locations
        });

    }

}