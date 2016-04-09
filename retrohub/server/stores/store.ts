/// <reference path="../../typings/redux/redux.d.ts" />
import { createStore, combineReducers } from 'redux';
import {dashboard} from '../reducers/dashboardReducers';
import {devices} from '../reducers/deviceReducers';
import {items} from '../reducers/itemReducers';
import {locations} from '../reducers/locationReducers';
import {rules} from '../reducers/ruleReducers';
import {users, userPasswords} from '../reducers/userReducers';

let combinedReducers = combineReducers({
    dashboard,
    devices,
    items,
    locations,
    rules,
    users,
    userPasswords
});

export const Store = createStore(combinedReducers);

//Store.subscribe(() =>
//    console.log(Store.getState())
//);