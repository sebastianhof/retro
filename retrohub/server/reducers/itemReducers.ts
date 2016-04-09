/// <reference path="../../typings/lodash/lodash.d.ts" />
'use strict';
import * as _ from 'lodash';
import {REMOVE_LOCATION} from '../actions/locationActions';
import {REMOVE_DEVICE} from '../actions/deviceActions';

import {ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM} from '../actions/itemActions';
import {DEFAULT_LOCATION_ID} from '../constants';
import {ItemModel} from "../models/itemModel";
export function items(state = [], action = null) {

    switch (action.type) {
        case ADD_ITEM:
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
        case REMOVE_ITEM:
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
        case UPDATE_ITEM:
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
        case REMOVE_LOCATION:
            let items = _.filter(state, (item:ItemModel) => item.locationId == action.value);
            var remainingItems = _.filter(state, (item:ItemModel) => item.locationId != action.value);
            _.forEach(items, (item:ItemModel) => {
                item.locationId = DEFAULT_LOCATION_ID
            });
            return [...remainingItems, ...items];
        case REMOVE_DEVICE:
            var remainingItems = _.filter(state, (item:ItemModel) => item.deviceId != action.value);
            return [...remainingItems];
        default:
            return state;
    }

}