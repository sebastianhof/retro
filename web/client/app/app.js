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
    'components/dashboard/dashboard'
], function (angular) {

    var app = angular
        .module('homehub', ['ngNewRouter', 'ngSanitize', 'homehub.layout', 'homehub.dashboard'])
        .controller('AppController', ['$router', '$scope', function ($router, $scope) {
            $router.config([
                {path: '/', redirectTo: '/dashboard'},
                {path: '/dashboard', component: 'dashboard'}
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
        angular.resumeBootstrap(['homehub']);
    });

    return app;

});