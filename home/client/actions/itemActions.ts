/// <reference path="../../typings/whatwg-fetch/whatwg-fetch.d.ts" />
import {ItemModel, ItemCategory} from "../models/itemModel";
import {Store} from '../stores/store';


export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export class ItemActions {

    static setFavorite(item:ItemModel, value:boolean) {

        item.isFavorite = value;

        Store.dispatch({
            type: UPDATE_ITEM,
            item: item
        });

    }

    static fetchItems() {

        Store.dispatch({
            type: REQUEST_ITEMS
        });

        fetch('api/items')
            .then(response => response.json())
            .then(json => Store.dispatch({
                type: RECEIVE_ITEMS,
                data: json.items,
                receivedAt: Date.now()
            }));

    }

}