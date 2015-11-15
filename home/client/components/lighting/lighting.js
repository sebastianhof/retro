define(['angular', 'components/settings/locations/locations'], function (angular) {

    angular
        .module('retro.lighting', ['retro.settings.locations'])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('lighting', {
                url: "/lighting",
                controller: 'LightingController',
                controllerAs: 'lighting',
                templateUrl: "components/lighting/lighting.html"
            });
        }])

        .controller('LightingController', ['$timeout', 'LocationService', function ($timeout, LocationService) {
            var controller = this;

            this.items = [
                {
                    id: 0,
                    type: 'light',
                    title: '',
                    locationId: 0,
                    values: {
                        on: true
                    }// reference
                },
                {
                    id: 1,
                    type: 'dimmer',
                    title: '',
                    locationId: 1,
                    values: {
                        on: true,
                        current: 80,
                        min: 0,
                        max: 100
                    }// reference
                },
                {
                    id: 2,
                    type: 'colorlight',
                    title: '',
                    locationId: 2,
                    values: {
                        on: true,
                        color: '#ff00ff'
                    }
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
                if (key == 'dimmer') {

                    var item = _.find(controller.items, {id: itemId});
                    if (item != null) {
                        $timeout(function () {
                            item.values.current = value
                        });

                    }
                } else if (key == 'switch') {

                    var item = _.find(controller.items, {id: itemId});
                    if (item != null) {
                        $timeout(function () {
                            item.values.on = value
                        });
                    }

                } else if (key == 'color') {

                    var item = _.find(controller.items, {id: itemId});
                    if (item != null) {
                        $timeout(function () {
                            item.values.color = value
                        });
                    }

                }

            }

        }])

});