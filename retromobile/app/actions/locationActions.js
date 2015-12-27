import {Store} from '../stores/store';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';

export class LocationActions {

    static fetchLocations() {

        Store.dispatch({
            type: REQUEST_LOCATIONS
        });

        fetch('localhost:8080/api/locations')
            .then(response => response.json())
            .then(json => Store.dispatch({
                type: RECEIVE_LOCATIONS,
                data: json.locations,
                receivedAt: Date.now()
            }))

    }

}