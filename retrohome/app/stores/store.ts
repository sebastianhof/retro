import { createStore, combineReducers } from 'redux';

import {Utils} from '../utils/utils'
import {ItemModel} from "../models/itemModel";
import {LocationModel} from "../models/locationModel";

import {REQUEST_ITEMS, RECEIVE_ITEMS, UPDATE_ITEM} from '../actions/itemActions'
import {REQUEST_LOCATIONS, RECEIVE_LOCATIONS} from "../actions/locationActions";
import {SEND_COMMAND, CONFIRM_COMMAND} from "../actions/commandActions";

function ui(state = {
    showSidebar: true,
    isFetching: false,
}, action = null) {

    switch (action.type) {
        case REQUEST_ITEMS:
        case REQUEST_LOCATIONS:
            return _.assign({}, state, {isFetching: true});
        case RECEIVE_ITEMS:
        case RECEIVE_LOCATIONS:
            return _.assign({}, state, {isFetching: false});
        default:
            return state;
    }

}

function events(state = {
    lastItemRefresh: null,
    lastLocationRefresh: null
}, action = null) {

    switch (action.type) {
        case RECEIVE_ITEMS:
            return _.assign({}, state, {lastItemRefresh: action.receivedAt});
        case RECEIVE_LOCATIONS:
            return _.assign({}, state, {lastLocationRefresh: action.receivedAt});
        default:
            return state;
    }

}

function items(state = [], action = null) {


    switch (action.type) {
        case RECEIVE_ITEMS:
            return action.data;
            break;
        case CONFIRM_COMMAND:
            var index = _.findIndex(state, {id: action.item.id});
            if (index > -1) {
                return [
                    ...state.slice(0, index),
                    _.assign({}, state[index], action.item),
                    ...state.slice(index + 1)
                ]
            } else {
                return [...state, action.item];
            }
            break;
        case UPDATE_ITEM:
            var index = _.findIndex(state, {id: action.item.id});
            if (index > -1) {
                return [
                    ...state.slice(0, index),
                    _.assign({}, state[index], action.item),
                    ...state.slice(index + 1)
                ]
            } else {
                return [...state, action.item];
            }
            break;
        default:
            return state;
    }

}

function locations(state = [], action = null) {

    switch (action.type) {
        case RECEIVE_LOCATIONS:
            return action.data;
            break;
        default:
            return state;
    }

}

let combinedReducers = combineReducers({
    ui,
    events,
    items,
    locations
});

export var Store = createStore(combinedReducers);

Store.subscribe(() =>
    console.log(Store.getState())
);