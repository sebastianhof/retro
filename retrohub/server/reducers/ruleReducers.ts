/// <reference path="../../typings/lodash/lodash.d.ts" />
'use strict';
import * as _ from 'lodash';
import {ADD_RULE, REMOVE_RULE, UPDATE_RULE} from '../actions/ruleActions';

export function rules(state = [], action = null) {

    switch (action.type) {
        case ADD_RULE:
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
        case REMOVE_RULE:
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
        case UPDATE_RULE:
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