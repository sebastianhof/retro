import {OPEN_SIDEMENU, CLOSE_SIDEMENU} from '../actions/uiActions';
import {REQUEST_ITEMS, RECEIVE_ITEMS} from '../actions/itemActions';
import {REQUEST_LOCATIONS, RECEIVE_LOCATIONS} from '../actions/locationActions';

export function ui(state = {
    showSideMenu: false,
    isFetching: false
}, action = null) {

    switch (action.type) {
        case REQUEST_ITEMS:
        case REQUEST_LOCATIONS:
            return _.assign({}, state, {isFetching: true});
        case RECEIVE_ITEMS:
        case RECEIVE_LOCATIONS:
            return _.assign({}, state, {isFetching: false});
        case OPEN_SIDEMENU:
            return _.assign({}, state, {showSideMenu: true});
        case CLOSE_SIDEMENU:
            return _.assign({}, state, {showSideMenu: false});
        default:
            return state;
    }

}