'use strict';
import {Store} from '../stores/store';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const UPDATE_ITEM = 'UPDATE_ITEM';


export class ItemActions {

    static setFavorite(item, value) {

        item.isFavorite = value;

        Store.dispatch({
            type: UPDATE_ITEM,
            item: item
        });

    }

    /**
     *
     * Fetch Items
     *
     * @returns {Promise<U>|Promise.<T>}
     */
    static fetchItems(protocol, host, port) {

        Store.dispatch({
            type: REQUEST_ITEMS
        });

        return fetch(`${protocol}${host}:${port}/api/items`)
            .then(response => response.json())
            .then(json => Store.dispatch({
                type: RECEIVE_ITEMS,
                data: json.items
            }));

    }

}