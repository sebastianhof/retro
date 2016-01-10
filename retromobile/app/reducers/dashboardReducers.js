var _ = require('lodash');

import {RECEIVE_DASHBOARD} from "../actions/dashboardActions";

export function dashboard(state = [], action = null) {

    switch (action.type) {
        case RECEIVE_DASHBOARD:
            return action.data;
            break;
        default:
            return state;
    }

}