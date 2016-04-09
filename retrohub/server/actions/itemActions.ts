'use strict';
import {Store} from '../stores/store';
import {ItemModel} from '../models/itemModel';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export class ItemActions {

    static addItem(item:ItemModel) {

        Store.dispatch({
            type: ADD_ITEM,
            value: item
        });

    }

    static removeItem(itemId:string) {

        Store.dispatch({
            type: REMOVE_ITEM,
            value: itemId
        });

    }

    static updateItem(item:ItemModel) {

        Store.dispatch({
            type: UPDATE_ITEM,
            value: item
        });

    }

}