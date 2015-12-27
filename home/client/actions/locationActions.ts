/// <reference path="../../typings/whatwg-fetch/whatwg-fetch.d.ts" />
import {Store} from '../stores/store';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';

export class LocationActions {

    static fetchLocations() {

        Store.dispatch({
            type: REQUEST_LOCATIONS
        });

        fetch('/api/locations')
            .then(response => response.json())
            .then(json => Store.dispatch({
                type: RECEIVE_LOCATIONS,
                data: json.locations,
                receivedAt: Date.now()
            }))

    }

}