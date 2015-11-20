import {LocationDatastore} from "../datastores/locationDatastore";
import {LocationModel, LocationType} from "../models/locationModel";
import {ItemDatastore} from "../datastores/itemDatastore";
import {ItemModel, ItemType} from "../models/itemModel";
import {SwitchValues} from "../models/itemModel";
import {ColorLightValues} from "../models/itemModel";
import {ThermostatValues} from "../models/itemModel";
import {WindowContactValues} from "../models/itemModel";
import {LightValues} from "../models/itemModel";
import {DimmerValues} from "../models/itemModel";
import {WeatherstationValues} from "../models/itemModel";
import {SmokeDetectorValues} from "../models/itemModel";
import {DoorLockValues} from "../models/itemModel";
import {BodyWeightValues} from "../models/itemModel";
export class RetroDemo {

    static initDemo() {

        var livingRoom = <LocationModel> {
            type: LocationType.LIVING_ROOM,
            title: 'Living room'
        };

        var kitchen = <LocationModel> {
            type: LocationType.KITCHEN,
            title: 'Kitchen'
        };

        var bathroom = <LocationModel> {
            type: LocationType.BATHROOM,
            title: 'Bathroom'

        };

        var bedroom = <LocationModel> {
            type: LocationType.BEDROOM,
            title: 'Bedroom'

        };

        var hall = <LocationModel> {
            type: LocationType.HALL,
            title: 'Hall'

        };

        var garden = <LocationModel> {
            type: LocationType.OUTSIDE,
            title: 'Garden'
        };

        LocationDatastore.getInstance().addLocation(livingRoom).then(function(location: LocationModel) {

            var televisionSwitch = <ItemModel> {
                uuid: 'AAAA0',
                locationId: location._id,
                type: ItemType.SWITCH,
                title: 'TV',
                values: <SwitchValues> {
                    on: false
                }
            };

            var colorLight = <ItemModel> {
                uuid: 'AAAA1',
                locationId: location._id,
                type: ItemType.COLORLIGHT,
                title: 'Living room',
                values: <ColorLightValues> {
                    on: false,
                    color: '#D91E18'
                }
            };

            var thermostat = <ItemModel> {
                uuid: 'AAAA2',
                locationId: location._id,
                type: ItemType.THERMOSTAT,
                title: 'Living room',
                values: <ThermostatValues> {
                    currentTemp: 20,
                    maxTemp: 30,
                    minTemp: 15
                }
            };

            var windowContact = <ItemModel> {
                uuid: 'AAAA3',
                locationId: location._id,
                type: ItemType.WINDOW_CONTACT,
                title: 'Living room',
                values: <WindowContactValues> {
                    closed: true
                }
            };

            ItemDatastore.getInstance().upsertItem(televisionSwitch);
            ItemDatastore.getInstance().upsertItem(colorLight);
            ItemDatastore.getInstance().upsertItem(thermostat);
            ItemDatastore.getInstance().upsertItem(windowContact);

        });

        LocationDatastore.getInstance().addLocation(kitchen).then(function(location: LocationModel) {

            var radioSwitch = <ItemModel> {
                uuid: 'BBBB0',
                locationId: location._id,
                type: ItemType.SWITCH,
                title: 'Radio',
                values: <SwitchValues> {
                    on: false
                }
            };

            var light = <ItemModel> {
                uuid: 'BBBB1',
                locationId: location._id,
                type: ItemType.LIGHT,
                title: 'Kitchen',
                values: <LightValues> {
                    on: false,
                }
            };

            var thermostat = <ItemModel> {
                uuid: 'BBBB2',
                locationId: location._id,
                type: ItemType.THERMOSTAT,
                title: 'Kitchen',
                values: <ThermostatValues> {
                    currentTemp: 15,
                    maxTemp: 30,
                    minTemp: 15
                }
            };

            var windowContact = <ItemModel> {
                uuid: 'BBBB3',
                locationId: location._id,
                type: ItemType.WINDOW_CONTACT,
                title: 'Kitchen',
                values: <WindowContactValues> {
                    closed: false
                }
            };

            var smokeDetector = <ItemModel> {
                uuid: 'BBBB4',
                locationId: location._id,
                type: ItemType.SMOKE_DETECTOR,
                title: 'Kitchen',
                values: <SmokeDetectorValues> {
                    smoke: false,
                    co2: 485
                }
            };

            ItemDatastore.getInstance().upsertItem(radioSwitch);
            ItemDatastore.getInstance().upsertItem(light);
            ItemDatastore.getInstance().upsertItem(thermostat);
            ItemDatastore.getInstance().upsertItem(windowContact);
            ItemDatastore.getInstance().upsertItem(smokeDetector);

        });

        LocationDatastore.getInstance().addLocation(bathroom).then(function(location: LocationModel) {

            var bodyWeight = <ItemModel> {
                uuid: 'CCCC0',
                locationId: location._id,
                type: ItemType.BODYWEIGHT,
                title: 'Withings',
                values: <BodyWeightValues> {
                    weight: 73,
                    fat: 18.2
                }
            };

            var dimmer = <ItemModel> {
                uuid: 'CCCC1',
                locationId: location._id,
                type: ItemType.DIMMER,
                title: 'Bathroom',
                values: <DimmerValues> {
                    on: false,
                    current: 50,
                    min: 0,
                    max: 100
                }
            };

            var thermostat = <ItemModel> {
                uuid: 'CCCC2',
                locationId: location._id,
                type: ItemType.THERMOSTAT,
                title: 'Bathroom',
                values: <ThermostatValues> {
                    currentTemp: 0,
                    maxTemp: 30,
                    minTemp: 15
                }
            };

            ItemDatastore.getInstance().upsertItem(bodyWeight);
            ItemDatastore.getInstance().upsertItem(dimmer);
            ItemDatastore.getInstance().upsertItem(thermostat);

        });

        LocationDatastore.getInstance().addLocation(bedroom).then(function(location: LocationModel) {

            var colorLight = <ItemModel> {
                uuid: 'DDDD0',
                locationId: location._id,
                type: ItemType.COLORLIGHT,
                title: 'Bedroom',
                values: <ColorLightValues> {
                    on: false,
                    color: '#4183D7'
                }
            };

            var thermostat = <ItemModel> {
                uuid: 'DDDD1',
                locationId: location._id,
                type: ItemType.THERMOSTAT,
                title: 'Bedroom',
                values: <ThermostatValues> {
                    currentTemp: 20,
                    maxTemp: 30,
                    minTemp: 15
                }
            };

            var windowContact = <ItemModel> {
                uuid: 'DDDD2',
                locationId: location._id,
                type: ItemType.WINDOW_CONTACT,
                title: 'Bedroom',
                values: <WindowContactValues> {
                    closed: true
                }
            };

            ItemDatastore.getInstance().upsertItem(colorLight);
            ItemDatastore.getInstance().upsertItem(thermostat);
            ItemDatastore.getInstance().upsertItem(windowContact);

        });

        LocationDatastore.getInstance().addLocation(hall).then(function(location: LocationModel) {

            var doorLockValues = <ItemModel> {
                uuid: 'EEEE0',
                locationId: location._id,
                type: ItemType.DOORLOCK,
                title: 'Frontdoor',
                values: <DoorLockValues> {
                    closed: false
                }
            };

            var cctv = <ItemModel> {
                uuid: 'EEEE1',
                locationId: location._id,
                type: ItemType.CCTV,
                title: 'Hall',
            };

            ItemDatastore.getInstance().upsertItem(doorLockValues);
            ItemDatastore.getInstance().upsertItem(cctv);

        });

        LocationDatastore.getInstance().addLocation(garden).then(function(location: LocationModel) {

            var weatherstation = <ItemModel> {
                uuid: 'FFFF0',
                locationId: location._id,
                type: ItemType.WEATHERSTATION,
                title: 'Garden',
                values: <WeatherstationValues> {
                    temperature: 23,
                    humidity: 59,
                    airpressure: 1020,
                    co2: 485
                }
            };

            var cctv = <ItemModel> {
                uuid: 'FFFF1',
                locationId: location._id,
                type: ItemType.CCTV,
                title: 'Garden',
            };

            ItemDatastore.getInstance().upsertItem(weatherstation);
            ItemDatastore.getInstance().upsertItem(cctv);

        });

    }
}