define(["require", "exports", "../../models/dashboardModel", 'angular'], function (require, exports, dashboardModel_1) {
    var DashboardController = (function () {
        function DashboardController($modal) {
            this.dashboardItems = [
                {
                    id: '0',
                    title: 'Leaving Home',
                    type: dashboardModel_1.DashboardType.SHORTCUT,
                    commands: []
                },
                {
                    id: '1',
                    title: 'Coming Home',
                    type: dashboardModel_1.DashboardType.SHORTCUT,
                    commands: []
                }
            ];
            this.addDashboardItem = function () {
                $modal.open({
                    templateUrl: '/components/dashboard/dashboard.add.html',
                    controllerAs: 'dashboardAdd',
                    controller: [DashboardAddController],
                });
            };
            this.getTemplate = function (dashboard) {
                switch (dashboard.type) {
                    case dashboardModel_1.DashboardType.SHORTCUT:
                        return 'components/dashboard/shortcut.html';
                    case dashboardModel_1.DashboardType.ITEM:
                        return 'components/dashboard/item.html';
                    case dashboardModel_1.DashboardType.GRAPH:
                        return 'components/dashboard/graph.html';
                }
            };
        }
        return DashboardController;
    })();
    var DashboardAddController = (function () {
        function DashboardAddController() {
        }
        return DashboardAddController;
    })();
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
});
