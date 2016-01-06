var _ = require('lodash');

import {RECEIVE_LOCATIONS} from "../actions/locationActions";

export function locations(state = [], action = null) {

    switch (action.type) {
        case RECEIVE_LOCATIONS:
            return action.data;
            break;
        default:
            return state;
    }

}