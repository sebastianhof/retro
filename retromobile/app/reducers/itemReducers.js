import {CONFIRM_COMMAND} from '../actions/commandActions';
import {RECEIVE_ITEMS, UPDATE_ITEM} from '../actions/itemActions';

export function items(state = [], action = null) {

    switch (action.type) {
        case RECEIVE_ITEMS:
            return action.data;
            break;
        case CONFIRM_COMMAND:
            var index = _.findIndex(state, {id: action.item.id});
            if (index > -1) {
                return [
                    ...state.slice(0, index),
                    _.assign({}, state[index], action.item),
                    ...state.slice(index + 1)
                ]
            } else {
                return [...state, action.item];
            }
            break;
        case UPDATE_ITEM:
            var index = _.findIndex(state, {id: action.item.id});
            if (index > -1) {
                return [
                    ...state.slice(0, index),
                    _.assign({}, state[index], action.item),
                    ...state.slice(index + 1)
                ]
            } else {
                return [...state, action.item];
            }
            break;
        default:
            return state;
    }

}