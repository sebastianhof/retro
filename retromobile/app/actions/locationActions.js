'use strict';
import {Store} from '../stores/store';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';

export class LocationActions {

    static receiveLocations(locations) {

        Store.dispatch({
            type: RECEIVE_LOCATIONS,
            data: locations
        });

    }

    static addLocation(location) {

        let connectionLink = Store.getState().settings.connectionLink;

        fetch(`${connectionLink}/api/locations`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            LocationActions.receiveLocations(data.locations);
        });

    }

    static updateLocation(location) {

        let connectionLink = Store.getState().settings.connectionLink;

        fetch(`${connectionLink}/api/locations/${location.id}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            LocationActions.receiveLocations(data.locations);
        });

    }

    static removeLocation(locationId) {

        let connectionLink = Store.getState().settings.connectionLink;

        fetch(`${connectionLink}/api/locations/${locationId}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            LocationActions.receiveLocations(data.locations);
        });

    }

}