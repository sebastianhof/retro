define(['angular',
    'components/settings/devices/devices',
    'components/settings/locations/locations',
    'components/settings/rules/rules',
    'components/settings/account/account'
], function (angular) {

    angular
        .module('homehub.settings', [
            'homehub.settings.devices',
            'homehub.settings.locations',
            'homehub.settings.rules',
            'homehub.settings.account'
        ])

        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('settings', {
                    controller: 'SettingsController',
                    controllerAs: 'settings',
                    templateUrl: "components/settings/settings.html",
                    abstract: true
                })
                .state('settings.view', {
                    url: "/settings",
                    views: {
                        "devices": {
                            templateUrl: "components/settings/devices/devices.html",
                            controller: "DeviceSettingsController",
                            controllerAs: "devices"
                        },
                        "locations": {
                            templateUrl: "components/settings/locations/locations.html",
                            controller: "LocationSettingsController",
                            controllerAs: "locations"
                        },
                        "rules": {
                            templateUrl: "components/settings/rules/rules.html",
                            controller: "RuleSettingsController",
                            controllerAs: "rules"
                        },
                        "account": {
                            templateUrl: "components/settings/account/account.html",
                            controller: "AccountSettingsController",
                            controllerAs: "account"
                        },
                    }
                })

            ;
        }])

        .controller('SettingsController', ['$scope', function ($scope) {


        }]);


});