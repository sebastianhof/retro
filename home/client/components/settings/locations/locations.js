define(['angular'], function (angular) {

    angular
        .module('homehub.settings.locations', [])
        .controller('LocationSettingsController', ['$scope', function ($scope) {


        }])
        .service('LocationService', ['$http', '$q', function ($http, $q) {

            return {
                getLocation: function (locationId) {
                    var deferred = $q.defer();

                    switch (locationId) {
                        case 0:
                            deferred.resolve({
                                id: 0,
                                title: 'Living Room',
                                type: 'living'
                            });
                            break;
                        case 1:
                            deferred.resolve({
                                id: 1,
                                title: 'Kitchen',
                                type: 'kitchen'
                            });
                            break;
                        case 2:
                            deferred.resolve({
                                id: 2,
                                title: 'Bathroom',
                                type: 'bath'
                            });
                            break;
                        case 3:
                            deferred.resolve({
                                id: 3,
                                title: 'Bedroom',
                                type: 'bed'
                            });
                            break;
                        case 4:
                            deferred.resolve({
                                id: 4,
                                title: 'Hallway',
                                type: 'hallway'
                            });
                            break;
                        case 5:
                            deferred.resolve({
                                id: 5,
                                title: 'Garden',
                                type: 'outside'
                            });
                            break;
                    }

                    return deferred.promise;
                }
            }

        }]);


});