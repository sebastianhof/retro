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

        .controller('SecurityController', ['$http', '$timeout', 'LocationService', function($http, $timeout, LocationService) {
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
                if (key == 'switch') {

                    var item = _.find(controller.items, {id: itemId});
                    if (item != null) {
                        $timeout(function () {
                            item.values.closed = value
                        });

                    }
                }

            };

            $http.get('api/items/security').success(function(data) {
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