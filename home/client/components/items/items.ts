/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/requirejs/require.d.ts" />
import 'angular';
import '../../services/services';
import {ItemModel, ItemCategory, ItemType} from "../../models/itemModel";
import {ThermostatValues} from "../../models/itemModel";
import {CommandType} from "../../models/commandModel";
import {RetroLocation} from "../../services/locationService";
import {RetroItem} from "../../services/itemService";
import {LocationModel} from "../../models/locationModel";
import {RetroCommand} from "../../services/commandService";

class RetroCategoryItemsController {
    resetFilter:() => void;
    items:Array<ItemModel>;
    filteredItems:Array<ItemModel>;
    filterLocation:(locationId:string) => void;
    filterFavorites:() => void;
    locations:Array<LocationModel> = [];

    constructor(RetroItem:RetroItem, RetroLocation:RetroLocation, category:ItemCategory) {
        this.resetFilter = () => this.filteredItems = this.items;
        this.filterLocation = (locationId:string) => this.filteredItems = _.filter(this.items, {locationId: locationId});
        this.filterFavorites = () => this.filteredItems = _.filter(this.items, {isFavorite: true});

        RetroItem.getItemsByCategory(category).then((items:Array<ItemModel>) => {
            // resolve locations
            _.forEach(items, (item:ItemModel) => {

                RetroLocation.getLocation(item.locationId).then((location:LocationModel) => {
                    let exists = _.find(this.locations, {id: item.locationId});
                    if (exists == null) {
                        this.locations.push(location)
                    }
                });

            });

            this.items = items;
            this.filteredItems = items; // TODO: filter by favorites
        })

    }

}

class RetroLocationItemsController {
    items:Array<ItemModel>;
    location:LocationModel;

    constructor(RetroItem:RetroItem, RetroLocation:RetroLocation, $stateParams) {

        RetroItem.getItemsByLocation($stateParams.locationId).then((items:Array<ItemModel>) => {
            this.items = items;
        });

        RetroLocation.getLocation($stateParams.locationId).then((location:LocationModel) => this.location = location);

    }
}

class RetroItemController {
    public getTemplate:() => string;
    public item:ItemModel;

    constructor($scope) {

        $scope.item = this.item;

        this.getTemplate = () => {
            switch (this.item.type) {
                case ItemType.BODYWEIGHT:
                    return 'components/items/bodyweight.html';
                case ItemType.CCTV:
                    return 'components/items/cctv.html';
                case ItemType.COLORDIMMER:
                case ItemType.COLORLIGHT:
                    return 'components/items/colorlight.html';
                case ItemType.DIMMER:
                    return 'components/items/dimmer.html';
                case ItemType.DOORLOCK:
                    return 'components/items/doorlock.html';
                case ItemType.GARAGE_DOOR:
                    return 'components/items/garagedoor.html';
                case ItemType.HEART_RATE_MONITOR:
                case ItemType.LIGHT:
                    return 'components/items/light.html';
                case ItemType.SMOKE_DETECTOR:
                    return 'components/items/smokedetector.html';
                case ItemType.SWITCH:
                    return 'components/items/switch.html';
                case ItemType.THERMOSTAT:
                    return 'components/items/thermostat.html';
                case ItemType.UNDEFINED:
                case ItemType.WEATHERSTATION:
                    return 'components/items/weatherstation.html';
                case ItemType.WINDOW_CONTACT:
                    return 'components/items/windowcontact.html';
            }
        }

    }
}

class RetroSwitchController {
    public value:string;
    public itemId:string;

    constructor($element, RetroCommand:RetroCommand) {
        $element[0].checked = this.value;
        $element[0].onchange = () => {
            RetroCommand.sendCommand(this.itemId, CommandType.SET_SWITCH, $element[0].checked);
        };

        new Switchery($element[0]);
    }
}

class RetroThermostatSliderController {
    public item:ItemModel;

    constructor($element, RetroCommand:RetroCommand) {
        let item:ItemModel = this.item;
        let values:ThermostatValues = item.values;

        require(['nouislider'], (noUiSlider) => {
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

            $element[0].noUiSlider.on('set', (value) => {
                RetroCommand.sendCommand(item.id, CommandType.SET_TEMP, parseInt(value));
            });
        });

    }
}

class RetroColorPickerController {
    public value:string;
    public itemId:string;

    constructor($element, RetroCommand:RetroCommand) {

        require(['raphael', 'colorwheel'], (Raphael, colorwheel) => {

            let cw = Raphael.colorwheel($($element)[0], 300, 180).color(this.value);
            $($element).width('auto');
            $($element).find('rect').remove();
            let circles = $($element).find('circle');
            circles[circles.length - 1].remove();
            circles[circles.length - 2].remove();
            cw.onchange((value) => {
                RetroCommand.sendCommand(this.itemId, CommandType.SET_COLOR, value).then((value:number) => {
                    cw.color(value);
                });
            });

        });

    }
}

class RetroDimmerSliderController {
    public value:string;
    public itemId:string;

    constructor($element, RetroCommand:RetroCommand) {

        require(['nouislider'], (noUiSlider) => {

            noUiSlider.create($element[0], {
                start: [this.value],
                range: {
                    min: 0,
                    max: 100
                },
                step: 10
            });

            $element[0].noUiSlider.on('set', (value) => {
                RetroCommand.sendCommand(this.itemId, CommandType.SET_BRIGHTNESS, parseInt(value));
            });

        });

    }
}

angular.module('retro.items', ['retro.services'])
    .constant('retro.items.category.climate', ItemCategory.CLIMATE)
    .constant('retro.items.category.lighting', ItemCategory.LIGHTING)
    .constant('retro.items.category.appliances', ItemCategory.APPLIANCES)
    .constant('retro.items.category.security', ItemCategory.SECURITY)
    .constant('retro.items.category.outdoor', ItemCategory.OUTDOOR)
    .constant('retro.items.category.car', ItemCategory.CAR)
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
    .directive('retroItem', () => <angular.IDirective> {
        scope: {
            item: '=',
        },
        template: '<ng-include src="retroItem.getTemplate()"></ng-include>',
        controller: ['$scope', RetroItemController],
        controllerAs: 'retroItem',
        bindToController: true
    })

    .directive('retroSwitch', () => <angular.IDirective> {
        scope: {
            itemId: '=',
            value: '=',
        },
        controller: ['$element', 'RetroCommand', RetroSwitchController],
        controllerAs: 'retroSwitch',
        bindToController: true
    })

    .directive('retroThermostatSlider', () => <angular.IDirective> {
        scope: {
            item: '=',
        },
        controller: ['$element', 'RetroCommand', RetroThermostatSliderController],
        controllerAs: 'retroThermostatSlider',
        bindToController: true
    })
    .directive('retroColorPicker', () => <angular.IDirective> {
        scope: {
            itemId: '=',
            value: '=',
        },
        controller: ['$element', 'RetroCommand', RetroColorPickerController],
        controllerAs: 'retroColorPicker',
        bindToController: true
    })
    .directive('retroDimmerSlider', () => <angular.IDirective> {
        scope: {
            itemId: '=',
            value: '=',
        },
        controller: ['$element', 'RetroCommand', RetroDimmerSliderController],
        controllerAs: 'retroDimmerSlider',
        bindToController: true
    });
//
//.filter('retrocommand', function () {
//    return function (command) {
//
//        var action = '';
//        if (command.action == 'turnoff') action = 'Turn off';
//        if (command.action == 'turnon') action = 'Turn on';
//        if (command.action == 'settemp') action = 'Set temperature of';
//
//        var type = '';
//        if (command.itemType == 'thermostat') type = 'Thermostat';
//        if (command.itemType == 'light') type = 'Light';
//        if (command.itemType == 'dimmer') type = 'Dimmer';
//        if (command.itemType == 'colorlight') type = 'Color light';
//        if (command.itemType == 'colordimmer') type = 'Color dimmer';
//        if (command.itemType == 'switch') type = 'Switch';
//
//        var value = '';
//        if (command.value) value = 'to ' + command.value;
//
//        return action + ' ' + command.itemTitle + ' ' + type + ' ' + value
//    }
//});
