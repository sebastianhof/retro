window.name = 'NG_DEFER_BOOTSTRAP!';

define([
    'angular-ui-router',
    'angular-sanitize',
    'components/layout/layout',
    'components/dashboard/dashboard',
    'components/climate/climate',
    'components/lighting/lighting',
    'components/appliances/appliances',
    'components/security/security',
    'components/settings/settings'
], function () {

    var app = angular
        .module('homehub', ['ngSanitize', 'ui.router',
            'homehub.layout',
            'homehub.dashboard',
            'homehub.climate',
            'homehub.lighting',
            'homehub.appliances',
            'homehub.security',
            'homehub.settings'
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

        .controller('AppController', ['$scope', function ($scope) {

            // Broadcasts a message to pgSearch directive to toggle search overlay
            this.showSearchOverlay = function () {
                $scope.$broadcast('toggleSearchOverlay', {
                    show: true
                })
            };

            this.data = {
                currentUser: {
                    id: '1',
                    firstname: 'Sebastian',
                    lastname: 'Hof',
                    email: 'mail@sebastianhof.com'
                }
            }
        }]);

    app.bootstrap = function () {
        angular.element().ready(function () {
            angular.resumeBootstrap(['homehub']);
        });
    };


    return app;

});