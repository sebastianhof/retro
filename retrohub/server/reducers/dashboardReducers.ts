/// <reference path="../../typings/lodash/lodash.d.ts" />
'use strict';
import * as _ from 'lodash';
import {ADD_DASHBOARD_ITEM, REMOVE_DASHBOARD_ITEM} from '../actions/dashboardActions';

export function dashboard(state = [], action = null) {

    switch (action.type) {
        case ADD_DASHBOARD_ITEM:
            return [
                ...state.slice(0),
                action.value
            ];
        case REMOVE_DASHBOARD_ITEM:
            let index = _.findIndex(state, {id: action.value});
            if (index > -1) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ]
            } else {
                return state;
            }
        default:
            return state;
    }

}