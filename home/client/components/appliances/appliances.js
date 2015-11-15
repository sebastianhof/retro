define(['angular', 'components/settings/locations/locations'], function(angular) {

    angular
        .module('retro.appliances', ['retro.settings.locations'])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('appliances', {
                url: "/appliances",
                controller: 'AppliancesController',
                controllerAs: 'appliances',
                templateUrl: "components/appliances/appliances.html"
            });
        }])

        .controller('AppliancesController', ['$timeout', 'LocationService', function($timeout, LocationService) {
            var controller = this;

            this.items = [
                {
                    id: 0,
                    type: 'switch',
                    title: 'Television',
                    locationId: 0,
                    values: {
                        on: true
                    }
                },
                {
                    id: 1,
                    type: 'switch',
                    title: 'Kitchen radio',
                    locationId: 1,
                    values: {
                        on: true,
                    }
                },
                {
                    id: 2,
                    type: 'bodyweight',
                    title: '',
                    locationId: 2,
                    values: {
                        weight: 73,
                        fat: 18.2
                    }
                },
                {
                    id: 4,
                    type: 'switch',
                    title: 'Raspberry Pi',
                    locationId: 4,
                    values: {
                        on: true,
                    }
                },

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

                if (key == 'switch') {

                    var item = _.find(controller.items, {id: itemId});
                    if (item != null) {
                        $timeout(function () {
                            item.values.on = value
                        });
                    }

                }

            }

        }]);

});