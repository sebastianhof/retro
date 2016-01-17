define(['angular'], function (angular) {


    angular
        .module('retro.settings.locations', [])
        .controller('LocationSettingsController', ['$scope', function ($scope) {


        }])
        .run(['$http', '$rootScope', function ($http, $rootScope) {

            $http.get().success(function (data) {
                $rootScope.locations = data.locations;
            });

        }])

});