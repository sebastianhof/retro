var _ = require('lodash');

import {RECEIVE_RULES} from "../actions/ruleActions";

export function rules(state = [], action = null) {

    switch (action.type) {
        case RECEIVE_RULES:
            return action.data;
            break;
        default:
            return state;
    }

}