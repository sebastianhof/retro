define(['angular', 'lodash', 'components/settings/locations/locations'], function (angular, _) {

    angular
        .module('retro.climate', ['retro.settings.locations'])

        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('climate', {
                url: "/climate",
                controller: 'ClimateController',
                controllerAs: 'climate',
                templateUrl: "components/climate/climate.html"
            });
        }])

        .controller('ClimateController', ['$timeout', '$http', 'LocationService', function ($timeout, $http, LocationService) {
            var controller = this;

            this.items = [
                {
                    id: 0,
                    type: 'thermostat',
                    title: '',
                    locationId: 0,
                    values: {
                        currentTemp: 18,
                        minTemp: 15,
                        maxTemp: 30
                    }// reference
                },
                {
                    id: 1,
                    type: 'thermostat',
                    title: '',
                    locationId: 1,
                    values: {
                        currentTemp: 22,
                        minTemp: 15,
                        maxTemp: 30
                    }// reference
                },
                {
                    id: 2,
                    type: 'weatherstation',
                    title: '',
                    locationId: 5,
                    values: {
                        temperature: 23,
                        humidity: 59,
                        airpressure: 1020,
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
                if (key == 'temp') {

                    var item = _.find(controller.items, {id: itemId});
                    if (item != null) {
                        $timeout(function () {
                            item.values.currentTemp = value
                        });

                    }
                }

            };

            //$http.get('api/items/climate').success(function(data) {
            //    controller.items = data.items;
            //    controller.filteredItems = controller.items;
            //})

        }])



});