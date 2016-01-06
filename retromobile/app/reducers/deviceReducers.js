var _ = require('lodash');

import {RECEIVE_DEVICES} from "../actions/deviceActions";

export function devices(state = [], action = null) {

    switch (action.type) {
        case RECEIVE_DEVICES:
            return action.data;
            break;
        default:
            return state;
    }

}