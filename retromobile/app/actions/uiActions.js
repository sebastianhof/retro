import {Store} from '../stores/store';

export const OPEN_SIDEMENU = 'OPEN_SIDEMENU';
export const CLOSE_SIDEMENU = 'CLOSE_SIDEMENU';

export class AppActions {

    static openSideMenu() {
        Store.dispatch({
            type: OPEN_SIDEMENU
        })
    }

    static closeSideMenu() {
        Store.dispatch({
            type: CLOSE_SIDEMENU
        })
    }

}