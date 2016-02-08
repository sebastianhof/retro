'use strict';
import {Store} from '../stores/store';

export const REQUEST_RULES = 'REQUEST_RULES';
export const RECEIVE_RULES = 'RECEIVE_RULES';

export class RuleActions {

    static receiveRules(rules) {

        Store.dispatch({
            type: RECEIVE_RULES,
            data: rules
        });

    }

}