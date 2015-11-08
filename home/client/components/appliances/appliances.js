define(['angular'], function(angular) {

    angular
        .module('homehub.appliances', [])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('appliances', {
                url: "/appliances",
                controller: 'AppliancesController',
                controllerAs: 'appliances',
                templateUrl: "components/appliances/appliances.html"
            });
        }])

        .controller('AppliancesController', [AppliancesController]);

    function AppliancesController () {

    }

});