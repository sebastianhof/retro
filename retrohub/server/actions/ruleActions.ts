'use strict';
import {Store} from '../stores/store';
import {RuleModel} from '../models/ruleModel';

export const ADD_RULE = 'ADD_RULE';
export const REMOVE_RULE = 'REMOVE_RULE';
export const UPDATE_RULE = 'UPDATE_RULE';

export class RuleActions {

    static addRule(rule: RuleModel) {

        Store.dispatch({
            type: ADD_RULE,
            value: rule
        });

    }

    static removeRule(ruleId: string) {

        Store.dispatch({
            type: REMOVE_RULE,
            value: ruleId
        });

    }

    static updateRule(rule: RuleModel) {

        Store.dispatch({
            type: UPDATE_RULE,
            value: rule
        });

    }

}