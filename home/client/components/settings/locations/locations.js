define(['angular'], function (angular) {


    angular
        .module('retro.settings.locations', [])
        .controller('LocationSettingsController', ['$scope', function ($scope) {


        }])
        .run(['$http', '$rootScope', function ($http, $rootScope) {

            $http.get('api/locations').success(function (data) {
                $rootScope.locations = data.locations;
            });

        }])
        .service('LocationService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

            return {
                getLocation: function (locationId) {
                    var deferred = $q.defer();

                    var location = _.find($rootScope.locations, { id: locationId});
                    if (location != null) {
                        deferred.resolve(location);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                }
            }

        }]);


});