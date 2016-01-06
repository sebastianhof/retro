/**
 * retro: Redux Store - A store maintains current application state
 *
 * v1.0
 */
import { createStore, combineReducers } from 'redux';
import { ui } from '../reducers/uiReducers';
import { items } from '../reducers/itemReducers';
import { locations } from '../reducers/locationReducers';
import { settings } from '../reducers/settingsReducers';

let combinedReducers = combineReducers({
    ui,
    items,
    locations,
    settings
});

export var Store = createStore(combinedReducers);

Store.subscribe(() =>
    console.log(Store.getState())
);