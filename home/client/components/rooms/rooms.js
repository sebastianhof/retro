define(['angular', 'components/settings/locations/locations'], function(angular) {

    angular
        .module('retro.rooms', ['retro.settings.locations'])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('rooms', {
                url: "/rooms/:roomId",
                controller: 'RoomsController',
                controllerAs: 'rooms',
                templateUrl: "components/rooms/rooms.html"
            });
        }])

        .controller('RoomsController', ['$http', '$timeout', '$stateParams', 'LocationService', function($http, $timeout, $stateParams, LocationService) {
            var controller = this;

            $http.get('api/items/rooms/' + $stateParams.roomId).success(function(data) {
                controller.items = data.items;
            });

            LocationService.getLocation($stateParams.roomId).then(function(location) {
                controller.location = location;
            });

        }]);

});