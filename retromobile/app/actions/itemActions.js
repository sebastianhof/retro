'use strict';
import _ from 'lodash';

import {Store} from '../stores/store';

import {ActType} from '../models/commandModel';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const UPDATE_ITEM = 'UPDATE_ITEM';


export class ItemActions {

    static receiveItems(items) {

        Store.dispatch({
            type: RECEIVE_ITEMS,
            data: items
        });

    }

    static setFavorite(item, value) {

        fetch(`${connectionLink}/api/items/${item.id}/favorite`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: value
            })
        }).then((item) => {

            Store.dispatch({
                type: UPDATE_ITEM,
                item: item
            });

        });

    }

    static act(item, commandType, value) {

        let clonedItem = _.cloneDeep(item);

        switch (commandType) {
            case ActType.SET_BRIGHTNESS:
                clonedItem.values['brightness'] = parseInt(value);
                clonedItem.values['on'] = parseInt(value) > 0;
                break;
            case ActType.SET_COLOR:
                clonedItem.values['hue'] = value.hue;
                clonedItem.values['saturation'] = value.saturation;
                break;
            case ActType.SET_SWITCH:
                clonedItem.values['on'] = value;
                break;
            case ActType.SET_TEMP:
                clonedItem.values['temp'] = parseInt(value);
                break;
            case ActType.SET_LOCK:
                clonedItem.values['closed'] = value;
                break;
        }

        let connectionLink = Store.getState().settings.connectionLink;

        fetch(`${connectionLink}/api/items/${item.id}/act`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: commandType,
                value: value
            })
        });

        // optimistic dispatch

        Store.dispatch({
            type: UPDATE_ITEM,
            item: clonedItem
        });

    }

    static sense(item) {

        fetch(`${connectionLink}/api/items/${item.id}/sense`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

    }

}