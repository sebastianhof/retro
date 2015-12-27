/**
 * retro: Redux Store - A store maintains current application state
 *
 * v1.0
 */
import { createStore, combineReducers } from 'redux';
import { ui } from '../reducers/uiReducers';
import { items } from '../reducers/itemReducers';
import { locations } from '../reducers/locationReducers';

let combinedReducers = combineReducers({
    ui,
    items,
    locations
});

export var Store = createStore(combinedReducers);

Store.subscribe(() =>
    console.log(Store.getState())
);