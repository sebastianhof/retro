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

            this.resetFilter = function () {
                this.filteredItems = this.items;
            };

            this.locations = {};

            this.filterLocation = function (locationId) {
                this.filteredItems = _.filter(this.items, {locationId: locationId});
            };

            this.setValue = function (itemId, key, value) {

                // TODO: Send command to server
                if (key == 'temp') {

                    var item = _.find(controller.items, {id: itemId});
                    if (item != null) {
                        $timeout(function () {
                            item.values.temp = value
                        });

                    }
                }

            };

            $http.get('api/items/climate').success(function(data) {
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