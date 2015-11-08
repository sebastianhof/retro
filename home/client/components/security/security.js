define(['angular'], function (angular) {

    angular
        .module('homehub.security', [])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('security', {
                url: "/security",
                controller: 'SecurityController',
                controllerAs: 'security',
                templateUrl: "components/security/security.html"
            });
        }])

        .controller('SecurityController', [SecurityController]);

    function SecurityController() {

    }

});