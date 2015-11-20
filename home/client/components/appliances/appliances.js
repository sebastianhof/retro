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

        .controller('AppliancesController', ['$http', '$timeout', 'LocationService', function($http, $timeout, LocationService) {
            var controller = this;

            this.resetFilter = function () {
                this.filteredItems = this.items;
            };

            this.locations = {};

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

            $http.get('api/items/appliances').success(function(data) {
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

        }]);

});