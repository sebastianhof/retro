'use strict';
import {Store} from '../stores/store';
var _ = require('lodash');
import {DashboardType} from '../models/dashboardModel';

export const REQUEST_DASHBOARD = 'REQUEST_DASHBOARD';
export const RECEIVE_DASHBOARD = 'RECEIVE_DASHBOARD';

export class DashboardActions {

    static fetchDashboard() {

        Store.dispatch({
            type: REQUEST_DASHBOARD
        });

        let connectionLink = Store.getState().settings.connectionLink;

        return fetch(`${connectionLink}/api/dashboard`)
            .then(response => response.json())
            .then(json => Store.dispatch({
                type: RECEIVE_DASHBOARD,
                data: json.dashboardItems
            }))

    }

    static addItem(itemId) {

        // TODO: use server call

        let item = _.find(Store.getState().items, {id: itemId});
        if (item != null) {

            let dashboardItems = Store.getState().dashboard;
            let dashboardItem = {
                type: DashboardType.ITEM,
                itemId: item.id
            };

            Store.dispatch({
                type: RECEIVE_DASHBOARD,
                data: [...dashboardItems.slice(0), dashboardItem]
            });

        }

    }

    static addCommand(commandDefinition) {

        let dashboardItem = {
            type: DashboardType.COMMAND,
            command: {
                id: '123456789',
                title: commandDefinition.title,
                actions: commandDefinition.actions
                // TODO: Add fields
            }
        };

        let dashboardItems = Store.getState().dashboard;

        Store.dispatch({
            type: RECEIVE_DASHBOARD,
            data: [...dashboardItems.slice(0), dashboardItem]
        });

    }

    static addChart(chartDefinition) {

        let dashboardItem = {
            type: DashboardType.CHART,
            chart: {
                id: '123456789',
                type: chartDefinition.type,
                title: chartDefinition.title
                // TODO: Add fields
            }
        };

        let dashboardItems = Store.getState().dashboard;

        Store.dispatch({
            type: RECEIVE_DASHBOARD,
            data: [...dashboardItems.slice(0), dashboardItem]
        });

    }

}