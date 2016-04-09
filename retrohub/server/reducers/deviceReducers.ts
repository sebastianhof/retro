/// <reference path="../../typings/lodash/lodash.d.ts" />
'use strict';
import * as _ from 'lodash';
import {ADD_DEVICE, UPDATE_DEVICE, REMOVE_DEVICE} from '../actions/deviceActions';

export function devices(state = [], action = null) {

    switch (action.type) {
        case ADD_DEVICE:
        {
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
        }
        case REMOVE_DEVICE:
        {
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
        case UPDATE_DEVICE:
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