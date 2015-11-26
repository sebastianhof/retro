/// <reference path="../../../typings/angularjs/angular.d.ts" />
import 'angular';
import {DashboardModel, DashboardType} from "../../models/dashboardModel";
import {DashboardShortcutModel} from "../../models/dashboardModel";
import {CommandModel} from "../../models/commandModel";

class DashboardController {
    public dashboardItems:Array<DashboardModel>;
    public getTemplate:(dashboard: DashboardModel) => string;
    public addDashboardItem:() => void;

    constructor($modal) {

        this.dashboardItems = [
            <DashboardShortcutModel> {
                id: '0',
                title: 'Leaving Home',
                type: DashboardType.SHORTCUT,
                commands: []
            },
            <DashboardShortcutModel> {
                id: '1',
                title: 'Coming Home',
                type: DashboardType.SHORTCUT,
                commands: []
            }
        ];

        this.addDashboardItem = () => {
            $modal.open({
                templateUrl: '/components/dashboard/dashboard.add.html',
                controllerAs: 'dashboardAdd',
                controller: [DashboardAddController],
            })
        };

        this.getTemplate = (dashboard: DashboardModel) => {
            switch (dashboard.type) {
                case DashboardType.SHORTCUT:
                    return 'components/dashboard/shortcut.html';
                case DashboardType.ITEM:
                    return 'components/dashboard/item.html';
                case DashboardType.GRAPH:
                    return 'components/dashboard/graph.html';
            }
        }
    }

}

class DashboardAddController {
    constructor() {

    }
}

angular.module('retro.dashboard', [])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/dashboard");
        $urlRouterProvider.when('', '/dashboard');
        $stateProvider.state('dashboard', {
            url: "/dashboard",
            controller: 'DashboardController',
            controllerAs: 'dashboard',
            templateUrl: "components/dashboard/dashboard.html"
        });
    }])

    .controller('DashboardController', ['$uibModal', DashboardController]);

