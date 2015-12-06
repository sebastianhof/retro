/// <reference path="../../typings/whatwg-fetch/whatwg-fetch.d.ts" />
import {ItemModel, ItemCategory} from "../models/itemModel";
import {Store} from '../stores/store';


export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

export function requestItems() {
    return {
        type: REQUEST_ITEMS
    }
}

export function receiveItems(json) {
    return {
        type: RECEIVE_ITEMS,
        data: json.items,
        receivedAt: Date.now()
    }
}

export class ItemActions {

    static fetchItems() {

        Store.dispatch(requestItems());

        fetch('api/items')
            .then(response => response.json())
            .then(json => Store.dispatch(receiveItems(json)));

    }

}