/// <reference path="../../typings/lodash/lodash.d.ts" />
'use strict';
import * as _ from 'lodash';
import {ADD_LOCATION, REMOVE_LOCATION, UPDATE_LOCATION} from '../actions/locationActions';
import {DEFAULT_LOCATION_ID} from '../constants';


export function locations(state = [], action = null) {

    switch (action.type) {
        case ADD_LOCATION:
            let index = _.findIndex(state, {id: action.value.id});
            if (index > -1) {
                return [
                    ...state.slice(0, index),
                    action.value,
                    ...state.slice(index + 1)
                ]
            } else {
                return [
                    ...state.slice(0),
                    action.value
                ];
            }
        case REMOVE_LOCATION:
        {
            if (action.value == DEFAULT_LOCATION_ID) {
                return state;
            }

            let index = _.findIndex(state, {id: action.value});
            if (index > -1) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ]
            } else {
                return state;
            }
        }
        case UPDATE_LOCATION:
        {
            let index = _.findIndex(state, {id: action.value.id});
            if (index > -1) {
                return [
                    ...state.slice(0, index),
                    action.value,
                    ...state.slice(index + 1)
                ]
            } else {
                return state;
            }
        }
        default:
            return state;
    }

}