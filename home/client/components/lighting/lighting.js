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

        .controller('LightingController', ['$http', '$timeout', 'LocationService', function ($http, $timeout, LocationService) {
            var controller = this;

            this.resetFilter = function () {
                this.filteredItems = this.items;
            };

            this.locations = {};

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

            };

            $http.get('api/items/lighting').success(function(data) {
                controller.items = data.items;
                controller.filteredItems = controller.items;
                // add location filter
                _.forEach(controller.items, function (item) {
                    if (controller.locations[item.locationId] == null) {
                        LocationService.getLocation(item.locationId).then(function (location) {
                            controller.locations[item.locationId] = location;
                        });
                    }
                });
            });

        }])

});