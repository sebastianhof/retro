define(["require", "exports", "../../models/itemModel", "../../models/commandModel", 'angular', '../../services/services'], function (require, exports, itemModel_1, commandModel_1) {
    var RetroCategoryItemsController = (function () {
        function RetroCategoryItemsController(RetroItem, RetroLocation, category) {
            var _this = this;
            this.locations = [];
            this.resetFilter = function () { return _this.filteredItems = _this.items; };
            this.filterLocation = function (locationId) { return _this.filteredItems = _.filter(_this.items, { locationId: locationId }); };
            this.filterFavorites = function () { return _this.filteredItems = _.filter(_this.items, { isFavorite: true }); };
            RetroItem.getItemsByCategory(category).then(function (items) {
                _.forEach(items, function (item) {
                    RetroLocation.getLocation(item.locationId).then(function (location) {
                        var exists = _.find(_this.locations, { id: item.locationId });
                        if (exists == null) {
                            _this.locations.push(location);
                        }
                    });
                });
                _this.items = items;
                _this.filteredItems = items;
            });
        }
        return RetroCategoryItemsController;
    })();
    var RetroLocationItemsController = (function () {
        function RetroLocationItemsController(RetroItem, RetroLocation, $stateParams) {
            var _this = this;
            RetroItem.getItemsByLocation($stateParams.locationId).then(function (items) {
                _this.items = items;
            });
            RetroLocation.getLocation($stateParams.locationId).then(function (location) { return _this.location = location; });
        }
        return RetroLocationItemsController;
    })();
    var RetroItemController = (function () {
        function RetroItemController($scope) {
            var _this = this;
            $scope.item = this.item;
            this.getTemplate = function () {
                switch (_this.item.type) {
                    case itemModel_1.ItemType.BODYWEIGHT:
                        return 'components/items/bodyweight.html';
                    case itemModel_1.ItemType.CCTV:
                        return 'components/items/cctv.html';
                    case itemModel_1.ItemType.COLORDIMMER:
                    case itemModel_1.ItemType.COLORLIGHT:
                        return 'components/items/colorlight.html';
                    case itemModel_1.ItemType.DIMMER:
                        return 'components/items/dimmer.html';
                    case itemModel_1.ItemType.DOORLOCK:
                        return 'components/items/doorlock.html';
                    case itemModel_1.ItemType.GARAGE_DOOR:
                        return 'components/items/garagedoor.html';
                    case itemModel_1.ItemType.HEART_RATE_MONITOR:
                    case itemModel_1.ItemType.LIGHT:
                        return 'components/items/light.html';
                    case itemModel_1.ItemType.SMOKE_DETECTOR:
                        return 'components/items/smokedetector.html';
                    case itemModel_1.ItemType.SWITCH:
                        return 'components/items/switch.html';
                    case itemModel_1.ItemType.THERMOSTAT:
                        return 'components/items/thermostat.html';
                    case itemModel_1.ItemType.UNDEFINED:
                    case itemModel_1.ItemType.WEATHERSTATION:
                        return 'components/items/weatherstation.html';
                    case itemModel_1.ItemType.WINDOW_CONTACT:
                        return 'components/items/windowcontact.html';
                }
            };
        }
        return RetroItemController;
    })();
    var RetroSwitchController = (function () {
        function RetroSwitchController($element, RetroCommand) {
            var _this = this;
            $element[0].checked = this.value;
            $element[0].onchange = function () {
                RetroCommand.sendCommand(_this.itemId, commandModel_1.CommandType.SET_SWITCH, $element[0].checked);
            };
            new Switchery($element[0]);
        }
        return RetroSwitchController;
    })();
    var RetroThermostatSliderController = (function () {
        function RetroThermostatSliderController($element, RetroCommand) {
            var item = this.item;
            var values = item.values;
            require(['nouislider'], function (noUiSlider) {
                noUiSlider.create($element[0], {
                    start: [values.temp],
                    range: {
                        min: 0,
                        '1%': values.minTemp,
                        max: values.maxTemp
                    },
                    pips: {
                        mode: 'values',
                        values: [values.currentTemp],
                        density: 4
                    },
                    step: 1
                });
                $element[0].noUiSlider.on('set', function (value) {
                    RetroCommand.sendCommand(item.id, commandModel_1.CommandType.SET_TEMP, parseInt(value));
                });
            });
        }
        return RetroThermostatSliderController;
    })();
    var RetroColorPickerController = (function () {
        function RetroColorPickerController($element, RetroCommand) {
            var _this = this;
            require(['raphael', 'colorwheel'], function (Raphael, colorwheel) {
                var cw = Raphael.colorwheel($($element)[0], 300, 180).color(_this.value);
                $($element).width('auto');
                $($element).find('rect').remove();
                var circles = $($element).find('circle');
                circles[circles.length - 1].remove();
                circles[circles.length - 2].remove();
                cw.onchange(function (value) {
                    RetroCommand.sendCommand(_this.itemId, commandModel_1.CommandType.SET_COLOR, value).then(function (value) {
                        cw.color(value);
                    });
                });
            });
        }
        return RetroColorPickerController;
    })();
    var RetroDimmerSliderController = (function () {
        function RetroDimmerSliderController($element, RetroCommand) {
            var _this = this;
            require(['nouislider'], function (noUiSlider) {
                noUiSlider.create($element[0], {
                    start: [_this.value],
                    range: {
                        min: 0,
                        max: 100
                    },
                    step: 10
                });
                $element[0].noUiSlider.on('set', function (value) {
                    RetroCommand.sendCommand(_this.itemId, commandModel_1.CommandType.SET_BRIGHTNESS, parseInt(value));
                });
            });
        }
        return RetroDimmerSliderController;
    })();
    angular.module('retro.items', ['retro.services'])
        .constant('retro.items.category.climate', itemModel_1.ItemCategory.CLIMATE)
        .constant('retro.items.category.lighting', itemModel_1.ItemCategory.LIGHTING)
        .constant('retro.items.category.appliances', itemModel_1.ItemCategory.APPLIANCES)
        .constant('retro.items.category.security', itemModel_1.ItemCategory.SECURITY)
        .constant('retro.items.category.outdoor', itemModel_1.ItemCategory.OUTDOOR)
        .constant('retro.items.category.car', itemModel_1.ItemCategory.CAR)
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
            $stateProvider
                .state('climate', {
                url: "/climate",
                controller: ['RetroItem', 'RetroLocation', 'retro.items.category.climate', RetroCategoryItemsController],
                controllerAs: 'retroCategoryItems',
                templateUrl: "components/items/categories.html"
            })
                .state('lighting', {
                url: "/lighting",
                controller: ['RetroItem', 'RetroLocation', 'retro.items.category.lighting', RetroCategoryItemsController],
                controllerAs: 'retroCategoryItems',
                templateUrl: "components/items/categories.html"
            })
                .state('appliances', {
                url: "/appliances",
                controller: ['RetroItem', 'RetroLocation', 'retro.items.category.appliances', RetroCategoryItemsController],
                controllerAs: 'retroCategoryItems',
                templateUrl: "components/items/categories.html"
            })
                .state('security', {
                url: "/security",
                controller: ['RetroItem', 'RetroLocation', 'retro.items.category.security', RetroCategoryItemsController],
                controllerAs: 'retroCategoryItems',
                templateUrl: "components/items/categories.html"
            })
                .state('outdoor', {
                url: "/outdoor",
                controller: ['RetroItem', 'RetroLocation', 'retro.items.category.outdoor', RetroCategoryItemsController],
                controllerAs: 'retroCategoryItems',
                templateUrl: "components/items/categories.html"
            })
                .state('car', {
                url: "/car",
                controller: ['RetroItem', 'RetroLocation', 'retro.items.category.car', RetroCategoryItemsController],
                controllerAs: 'retroCategoryItems',
                templateUrl: "components/items/categories.html"
            })
                .state('rooms', {
                url: "/rooms/:locationId",
                controller: ['RetroItem', 'RetroLocation', '$stateParams', RetroLocationItemsController],
                controllerAs: 'retroLocationItems',
                templateUrl: "components/items/locations.html"
            });
        }])
        .directive('retroItem', function () { return {
        scope: {
            item: '=',
        },
        template: '<ng-include src="retroItem.getTemplate()"></ng-include>',
        controller: ['$scope', RetroItemController],
        controllerAs: 'retroItem',
        bindToController: true
    }; })
        .directive('retroSwitch', function () { return {
        scope: {
            itemId: '=',
            value: '=',
        },
        controller: ['$element', 'RetroCommand', RetroSwitchController],
        controllerAs: 'retroSwitch',
        bindToController: true
    }; })
        .directive('retroThermostatSlider', function () { return {
        scope: {
            item: '=',
        },
        controller: ['$element', 'RetroCommand', RetroThermostatSliderController],
        controllerAs: 'retroThermostatSlider',
        bindToController: true
    }; })
        .directive('retroColorPicker', function () { return {
        scope: {
            itemId: '=',
            value: '=',
        },
        controller: ['$element', 'RetroCommand', RetroColorPickerController],
        controllerAs: 'retroColorPicker',
        bindToController: true
    }; })
        .directive('retroDimmerSlider', function () { return {
        scope: {
            itemId: '=',
            value: '=',
        },
        controller: ['$element', 'RetroCommand', RetroDimmerSliderController],
        controllerAs: 'retroDimmerSlider',
        bindToController: true
    }; });
});
