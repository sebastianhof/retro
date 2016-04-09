/// <reference path="../../typings/lodash/lodash.d.ts" />
'use strict';
import * as _ from 'lodash';
import {ADD_USER, REMOVE_USER, UPDATE_USER, UPDATE_PASSWORD} from '../actions/userActions';

export function users(state = [], action = null) {

    switch (action.type) {
        case ADD_USER:
            return [
                ...state.slice(0),
                action.value
            ];
        case REMOVE_USER:
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
        case UPDATE_USER:
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

export function userPasswords(state = [], action = null) {

    switch (action.type) {
        case UPDATE_PASSWORD:
            let index = _.findIndex(state, {userId: action.value.userId});
            if (index > -1) {
                return [
                    ...state.slice(0, index),
                    action.value,
                    ...state.slice(index + 1)
                ];
            } else {
                return [
                    ...state.slice(0),
                    action.value
                ];
            }
        default:
            return state;
    }

}