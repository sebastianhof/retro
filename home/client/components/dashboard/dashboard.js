define(['angular'], function(angular) {

    angular
        .module('homehub.dashboard', [])

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

        .controller('DashboardController', [DashboardController]);

    function DashboardController () {

    }

});