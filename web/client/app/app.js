require.config({
    baseUrl: '../',
    paths: {
        'angular': 'bower_components/angular/angular',
        'angular-new-router': 'bower_components/angular-new-router/dist/router.es5.min',
        'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize.min',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'jquery.scrollbar': 'bower_components/jquery.scrollbar/jquery.scrollbar.min',
        'lodash': 'bower_components/lodash/lodash.min',
        'pages': 'layout/js/pages'
    },
    shim: {
        'angular': {
            exports: "angular"
        },
        'angular-new-router': ['angular'],
        'angular-sanitize': ['angular'],
        'bootstrap': ['jquery'],
        'jquery.scrollbar': ['jquery'],
        'pages': ['jquery']
    },
    deps: ['bootstrap', 'lodash', 'jquery.scrollbar', 'pages']
});

window.name = 'NG_DEFER_BOOTSTRAP!';

require([
    'angular',
    'angular-new-router',
    'angular-sanitize',
    'components/layout/layout',
    'components/dashboard/dashboard',
    'components/climate/climate',
    'components/lighting/lighting',
    'components/appliances/appliances',
    'components/security/security',
    'components/settings/settings'
], function (angular) {

    var app = angular
        .module('retro', ['ngNewRouter', 'ngSanitize', 'retro.layout', 'retro.dashboard', 'retro.climate', 'retro.lighting', 'retro.appliances', 'retro.security', 'retro.settings'])
        .controller('AppController', ['$router', '$scope', function ($router, $scope) {
            $router.config([
                {path: '/', redirectTo: '/dashboard'},
                {path: '/dashboard', component: 'dashboard'},
                {path: '/climate', component: 'climate'},
                {path: '/lighting', component: 'lighting'},
                {path: '/appliances', component: 'appliances'},
                {path: '/security', component: 'security'},
                {path: '/settings', component: 'settings'}
            ]);

            // Broadcasts a message to pgSearch directive to toggle search overlay
            this.showSearchOverlay = function() {
                $scope.$broadcast('toggleSearchOverlay', {
                    show: true
                })
            }

            this.data = {
                currentUser: {
                    id: '1',
                    firstname: 'Sebastian',
                    lastname: 'Hof',
                    email: 'mail@sebastianhof.com'
                }
            }
        }]);

    angular.element().ready(function () {
        angular.resumeBootstrap(['retro']);
    });

    return app;

});