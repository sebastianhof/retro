define(['angular', 'lodash', 'components/settings/locations/locations'], function(angular, _) {

    angular
        .module('homehub.climate', ['homehub.settings.locations'])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('climate', {
                url: "/climate",
                controller: 'ClimateController',
                controllerAs: 'climate',
                templateUrl: "components/climate/climate.html"
            });
        }])
        .directive('homehubThermostatSlider', function() {
            return {
                scope: {
                    itemId: '=',
                    value: '=',
                    max: '=',
                    min: '=',
                    onSet: '='
                },
                link: function(scope, elem) {

                    require(['nouislider'], function(noUiSlider) {

                        noUiSlider.create(elem[0], {
                            start: [scope.value],
                            range: {
                                min: 0,
                                '1%': scope.min,
                                '99%': scope.max,
                                max: 100,

                            },
                            step: 1
                        });

                        elem[0].noUiSlider.on('set', function(value){
                            if (scope.onSet) scope.onSet(scope.itemId, 'temp', parseInt(value));
                        });

                    });



                }
            }
        })

        .controller('ClimateController', ['$timeout', 'LocationService', function ($timeout, LocationService) {
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

            this.resetFilter = function() {
                this.filteredItems = this.items;
            };

            this.locations = {};
            // add location filter
            _.forEach(this.items, function(item) {
                if (controller.locations[item.locationId] == null) {
                 LocationService.getLocation(item.locationId).then(function(location) {
                     controller.locations[item.locationId] = location;
                 });
                }
            });

            this.filterLocation = function(locationId) {
              this.filteredItems = _.filter(this.items, {locationId: locationId});
            };


            this.setValue = function(itemId, key, value) {

                // TODO: Send command to server
                if (key == 'temp') {

                    var item = _.find(controller.items, { id: itemId });
                    if (item != null) {
                        $timeout(function() {
                            item.values.currentTemp = value
                        });

                    }
                }

            }

        }]);


});