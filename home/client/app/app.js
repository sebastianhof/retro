window.name = 'NG_DEFER_BOOTSTRAP!';

define([
    'angular-ui-router',
    'angular-sanitize',
    'angular-bootstrap',
    'components/layout/layout',
    'components/items/items',
    'components/dashboard/dashboard',
    'components/climate/climate',
    'components/lighting/lighting',
    'components/appliances/appliances',
    'components/security/security',
    'components/rooms/rooms',
    'components/settings/settings'
], function () {

    var app = angular
        .module('retro', ['ngSanitize', 'ui.router', 'ui.bootstrap',
            'retro.layout',
            'retro.items',
            'retro.dashboard',
            'retro.climate',
            'retro.lighting',
            'retro.appliances',
            'retro.rooms',
            'retro.security',
            'retro.settings'
        ])

        //.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        //    $ocLazyLoadProvider.config({
        //        debug: true,
        //        modules: [
        //            {name: 'angular-ui-router', files: ['bower_components/angular-ui-router/release/angular-ui-router.min']},
        //            {name: 'angular-sanitize', files: ['bower_components/angular-sanitize/angular-sanitize.min']},
        //        ]
        //    });
        //}])

        .controller('AppController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            var controller = this;
            // Broadcasts a message to pgSearch directive to toggle search overlay
            this.showSearchOverlay = function () {
                $scope.$broadcast('toggleSearchOverlay', {
                    show: true
                })
            };

            /*
             * User
             */
            $http.get('/api/user').success(function (user) {
                controller.user = user;
            });

            /*
             * Locations
             */
            $http.get('api/locations').success(function (data) {
                controller.locations = data.locations;
            });

        }]);

    app.bootstrap = function () {
        angular.element().ready(function () {
            angular.resumeBootstrap(['retro']);
        });
    };

    return app;

});