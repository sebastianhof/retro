define(['angular'], function(angular) {

    angular
        .module('retro.dashboard', [])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/dashboard");
            $urlRouterProvider.when('', '/dashboard');
            $stateProvider.state('dashboard', {
                url: "/dashboard",
                controller: 'DashboardController',
                controllerAs: 'dashboard',
                templateUrl: "components/dashboard/dashboard.html"
            });
        }])

        .controller('DashboardController', [function() {

            this.items = [
                {
                    title: 'Leaving Home',
                    type: 'shortcut',
                    commands: [
                        {
                            action: 'turnoff',
                            itemId: 'XXXX',
                            itemTitle: 'Kitchen',
                            itemType: 'light',
                            locationId: 'xxxx'
                        },
                        {
                            action: 'turnoff',
                            itemId: 'XXXX',
                            itemTitle: 'Living room',
                            itemType: 'light',
                            locationId: 'xxxx'
                        },
                        {
                            action: 'settemp',
                            itemId: 'XXXX',
                            itemTitle: 'Living room',
                            itemType: 'thermostat',
                            locationId: 'xxxx',
                            value: 17
                        }
                    ]
                },
                {
                    title: 'Coming Home',
                    type: 'shortcut',
                    commands: [
                        {
                            action: 'turnon',
                            itemId: 'XXXX',
                            itemTitle: 'Kitchen',
                            itemType: 'light',
                            locationId: 'xxxx'
                        },
                        {
                            action: 'turnon',
                            itemId: 'XXXX',
                            itemTitle: 'Living room',
                            itemType: 'light',
                            locationId: 'xxxx'
                        },
                        {
                            action: 'settemp',
                            itemId: 'XXXX',
                            itemTitle: 'Living room',
                            itemType: 'thermostat',
                            locationId: 'xxxx',
                            value: 21
                        }
                    ]
                }


            ]


        }]);

});