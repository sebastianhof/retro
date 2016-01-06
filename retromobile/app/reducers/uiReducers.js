var _ = require('lodash');

import {OPEN_SIDEMENU, CLOSE_SIDEMENU} from '../actions/uiActions';
import {REQUEST_ITEMS, RECEIVE_ITEMS} from '../actions/itemActions';
import {REQUEST_LOCATIONS, RECEIVE_LOCATIONS} from '../actions/locationActions';
import {REQUEST_DEVICES, RECEIVE_DEVICES} from '../actions/deviceActions';
import {REQUEST_RULES, RECEIVE_RULES} from '../actions/ruleActions';

export function ui(state = {
    showSideMenu: false,
    isFetching: false
}, action = null) {

    switch (action.type) {
        case REQUEST_ITEMS:
        case REQUEST_LOCATIONS:
        case REQUEST_DEVICES:
        case REQUEST_RULES:
            return _.assign({}, state, {isFetching: true});
        case RECEIVE_ITEMS:
        case RECEIVE_LOCATIONS:
        case RECEIVE_DEVICES:
        case RECEIVE_RULES:
            return _.assign({}, state, {isFetching: false});
        case OPEN_SIDEMENU:
            return _.assign({}, state, {showSideMenu: true});
        case CLOSE_SIDEMENU:
            return _.assign({}, state, {showSideMenu: false});
        default:
            return state;
    }

}