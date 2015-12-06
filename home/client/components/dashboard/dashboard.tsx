/// <reference path="../../../typings/react/react.d.ts" />
import React = require('react');

import {DashboardModel, DashboardType} from "../../models/dashboardModel";
import {DashboardShortcutModel} from "../../models/dashboardModel";
import {CommandModel} from "../../models/commandModel";

export interface DashboardComponentProperties {

}

export class DashboardComponent extends React.Component<DashboardComponentProperties, any> {

    static defaultProps:DashboardComponentProperties = {};

    render() {

        return (

            <div className="panel panel-transparent ">
                <div className="panel-heading">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary btn-cons btn-animated from-left fa fa-plus">
                            <span>Add</span>
                        </button>
                    </div>
                </div>

                <div className="panel-body" style={{'minHeight': '80vh'}}>

                    <div className="row column-seperation">
                        <div className="col-md-12">

                            <div className="row">

                                <div className="col-md-4 m-b-20">

                                    {/*<ng-include src="dashboard.getTemplate(item)"></ng-include>*/}

                                </div>

                                <div className="clearfix"></div>
                                {/* ng-if="$index % 3 == 2"  */}

                            </div>
                        </div>
                    </div>


                </div>

            </div>

        )

    }

}


//class DashboardController {
//    public dashboardItems:Array<DashboardModel>;
//    public getTemplate:(dashboard: DashboardModel) => string;
//    public addDashboardItem:() => void;
//
//    constructor($modal) {
//
//        this.dashboardItems = [
//            <DashboardShortcutModel> {
//                id: '0',
//                title: 'Leaving Home',
//                type: DashboardType.SHORTCUT,
//                commands: []
//            },
//            <DashboardShortcutModel> {
//                id: '1',
//                title: 'Coming Home',
//                type: DashboardType.SHORTCUT,
//                commands: []
//            }
//        ];
//
//        this.addDashboardItem = () => {
//            $modal.open({
//                templateUrl: '/components/dashboard/dashboard.add.html',
//                controllerAs: 'dashboardAdd',
//                controller: [DashboardAddController],
//            })
//        };
//
//        this.getTemplate = (dashboard: DashboardModel) => {
//            switch (dashboard.type) {
//                case DashboardType.SHORTCUT:
//                    return 'components/dashboard/shortcut.html';
//                case DashboardType.ITEM:
//                    return 'components/dashboard/item.html';
//                case DashboardType.GRAPH:
//                    return 'components/dashboard/graph.html';
//            }
//        }
//    }
//
//}
//
//class DashboardAddController {
//    constructor() {
//
//    }
//}
//
//export var app = angular.module('retro.dashboard', [])
//
//    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
//        $urlRouterProvider.otherwise("/dashboard");
//        $urlRouterProvider.when('', '/dashboard');
//        $stateProvider.state('dashboard', {
//            url: "/dashboard",
//            controller: 'DashboardController',
//            controllerAs: 'dashboard',
//            templateUrl: "components/dashboard/dashboard.html"
//        });
//    }])
//
//    .controller('DashboardController', ['$uibModal', DashboardController]);

