'use strict';
import {Store} from '../stores/store';
import {DashboardModel} from '../models/dashboardModel';

export const ADD_DASHBOARD_ITEM = 'ADD_DASHBOARD_ITEM';
export const REMOVE_DASHBOARD_ITEM = 'REMOVE_DASHBOARD_ITEM';

export class DashboardActions {

    static addDashboardItem(item:DashboardModel) {

        Store.dispatch({
            type: ADD_DASHBOARD_ITEM,
            value: item
        });

    }

    static removeDashboardItem(dashboardItemId:string) {

        Store.dispatch({
            type: REMOVE_DASHBOARD_ITEM,
            value: dashboardItemId
        });

    }

}