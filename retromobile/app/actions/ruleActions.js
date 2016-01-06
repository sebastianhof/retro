'use strict';
import {Store} from '../stores/store';

export const REQUEST_RULES = 'REQUEST_RULES';
export const RECEIVE_RULES = 'RECEIVE_RULES';

export class RuleActions {

    static fetchRules() {

        Store.dispatch({
            type: REQUEST_RULES
        });

        let connectionLink = Store.getState().settings.connectionLink;

        return fetch(`${connectionLink}/api/rules`)
            .then(response => response.json())
            .then(json => Store.dispatch({
                type: RECEIVE_RULES,
                data: json.rules
            }))

    }

}