'use strict';
import {Store} from '../stores/store';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';

export class LocationActions {

    /**
     *
     * Fetch locations
     *
     * @returns {Promise<U>|Promise.<T>}
     */
    static fetchLocations(protocol, host, port) {

        Store.dispatch({
            type: REQUEST_LOCATIONS
        });

        return fetch(`${protocol}${host}:${port}/api/locations`)
            .then(response => response.json())
            .then(json => Store.dispatch({
                type: RECEIVE_LOCATIONS,
                data: json.locations
            }))

    }

}