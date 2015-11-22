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
    'components/outdoor/outdoor',
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
            'retro.security',
            'retro.outdoor',
            'retro.rooms',
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

            this.sidebar = 'categories';

            this.toggleSidebar = function() {
                if (this.sidebar == 'categories') this.sidebar = 'rooms';
                else if (this.sidebar == 'rooms') this.sidebar = 'categories';
             };

            this.getItemTemplate = function (itemType) {

                switch (itemType) {
                    case 'thermostat':
                        return 'components/items/thermostat.html';
                    case 'weatherstation':
                        return 'components/items/weatherstation.html';
                    case 'light':
                        return 'components/items/light.html';
                    case 'dimmer':
                        return 'components/items/dimmer.html';
                    case 'colorlight':
                        return 'components/items/colorlight.html';
                    case 'switch':
                        return 'components/items/switch.html';
                    case 'bodyweight':
                        return 'components/items/bodyweight.html';
                    case 'doorlock':
                        return 'components/items/doorlock.html';
                    case 'windowcontact':
                        return 'components/items/windowcontact.html';
                    case 'cctv':
                        return 'components/items/cctv.html';
                    case 'smokedetector':
                        return 'components/items/smokedetector.html';
                    case 'shortcut':
                        return 'components/items/shortcut.html';
                }

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