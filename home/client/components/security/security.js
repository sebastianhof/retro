define(['angular', 'lodash', 'components/settings/locations/locations'], function (angular, _) {

    angular
        .module('retro.security', ['retro.settings.locations'])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
            $stateProvider.state('security', {
                url: "/security",
                controller: 'SecurityController',
                controllerAs: 'security',
                templateUrl: "components/security/security.html"
            });
        }])

        .controller('SecurityController', ['$timeout', 'LocationService', function($timeout, LocationService) {
            var controller = this;

            this.items = [
                {
                    id: 1,
                    type: 'cctv',
                    title: '',
                    locationId: 4,
                    values: {
                        src: 'layout/img/cctv.jpg'
                    }// reference
                },
                {
                    id: 2,
                    type: 'cctv',
                    title: '',
                    locationId: 5,
                    values: {
                        src: 'layout/img/cctv2.jpg'
                    }// reference
                },
                {
                    id: 0,
                    type: 'doorlock',
                    title: 'Front door',
                    locationId: 4,
                    values: {
                        closed: false
                    }// reference
                },
                {
                    id: 3,
                    type: 'windowcontact',
                    title: '',
                    locationId: 1,
                    values: {
                        closed: true
                    }// reference
                },
                {
                    id: 4,
                    type: 'smokedetector',
                    title: '',
                    locationId: 1,
                    values: {
                        smoke: false,
                        co2: 485
                    }// reference
                }


            ];

            this.filteredItems = this.items;

            this.resetFilter = function () {
                this.filteredItems = this.items;
            };

            this.locations = {};
            // add location filter
            _.forEach(this.items, function (item) {
                if (controller.locations[item.locationId] == null) {
                    LocationService.getLocation(item.locationId).then(function (location) {
                        controller.locations[item.locationId] = location;
                    });
                }
            });

            this.filterLocation = function (locationId) {
                this.filteredItems = _.filter(this.items, {locationId: locationId});
            };


            this.setValue = function (itemId, key, value) {

                // TODO: Send command to server
                if (key == 'switch') {

                    var item = _.find(controller.items, {id: itemId});
                    if (item != null) {
                        $timeout(function () {
                            item.values.closed = value
                        });

                    }
                }

            }

        }]);


});