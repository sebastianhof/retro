import {LocationModel, LocationType} from "./models/locationModel";
import {ItemModel, ItemType, ItemCategory} from "./models/itemModel";
import {UserModel, UserRole} from "./models/userModel";

import {SwitchValues} from "./models/itemModel";
import {ColorLightValues} from "./models/itemModel";
import {LightValues} from "./models/itemModel";
import {DimmerValues} from "./models/itemModel";
import {WeatherStationValues} from "./models/itemModel";
import {SmokeDetectorValues} from "./models/itemModel";
import {DoorLockValues} from "./models/itemModel";
import {BodyWeightValues} from "./models/itemModel";
import {GarageDoorValues} from "./models/itemModel";

import {RetroUUID} from "./utils";
import {DEFAULT_LOCATION_ID} from "./constants";

import {ItemActions} from "./actions/itemActions";
import {LocationActions} from "./actions/locationActions";
import {UserActions} from "./actions/userActions";

export class RetroDemo {

    static init() {

        var adminUser = <UserModel> {
            id: 'admin',
            role: UserRole.ADMIN,
            firstname: 'Retro',
            lastname: 'Administrator',
            email: 'admin@retro'
        };

        UserActions.addUser(adminUser);
        UserActions.updateUserPassword(adminUser.id, "retro");

        var livingRoom = <LocationModel> {
            id: RetroUUID.generateUUID(),
            type: LocationType.LIVING_ROOM,
            title: 'Living room'
        };

        var kitchen = <LocationModel> {
            id: RetroUUID.generateUUID(),
            type: LocationType.KITCHEN,
            title: 'Kitchen'
        };

        var bathroom = <LocationModel> {
            id: RetroUUID.generateUUID(),
            type: LocationType.BATHROOM,
            title: 'Bathroom'

        };

        var bedroom = <LocationModel> {
            id: RetroUUID.generateUUID(),
            type: LocationType.BEDROOM,
            title: 'Bedroom'

        };

        var hall = <LocationModel> {
            id: RetroUUID.generateUUID(),
            type: LocationType.HALL,
            title: 'Hall'

        };

        var garden = <LocationModel> {
            id: RetroUUID.generateUUID(),
            type: LocationType.OUTSIDE,
            title: 'Garden'
        };

        var garage = <LocationModel> {
            id: RetroUUID.generateUUID(),
            type: LocationType.OUTSIDE,
            title: 'Garage'
        };

        var defaultLocation = <LocationModel> {
            id: DEFAULT_LOCATION_ID,
            type: LocationType.OTHER,
            title: 'Not set'
        };

        LocationActions.addLocation(livingRoom);
        LocationActions.addLocation(kitchen);
        LocationActions.addLocation(bathroom);
        LocationActions.addLocation(bedroom);
        LocationActions.addLocation(hall);
        LocationActions.addLocation(garden);
        LocationActions.addLocation(garage);
        LocationActions.addLocation(defaultLocation);

        var televisionSwitch = <ItemModel> {
            id: RetroUUID.generateUUID(),
            locationId: livingRoom.id,
            type: ItemType.SWITCH,
            category: ItemCategory.APPLIANCES,
            title: 'TV',
            values: <SwitchValues> {
                on: false
            }
        };

        var colorLight = <ItemModel> {
            id: RetroUUID.generateUUID(),
            locationId: livingRoom.id,
            type: ItemType.COLOR_LIGHT,
            category: ItemCategory.LIGHTING,
            title: 'Living room',
            values: <ColorLightValues> {
                on: false,
                color: '#D91E18'
            }
        };

        ItemActions.addItem(televisionSwitch);
        //ItemActions.addItem(colorLight);

        var radioSwitch = <ItemModel> {
            id: RetroUUID.generateUUID(),
            locationId: kitchen.id,
            type: ItemType.SWITCH,
            category: ItemCategory.APPLIANCES,
            title: 'Radio',
            values: <SwitchValues> {
                on: false
            }
        };

        var light = <ItemModel> {
            id: RetroUUID.generateUUID(),
            locationId: kitchen.id,
            type: ItemType.LIGHT,
            category: ItemCategory.LIGHTING,
            title: 'Kitchen',
            values: <LightValues> {
                on: false,
            }
        };

        var smokeDetector = <ItemModel> {
            id: RetroUUID.generateUUID(),
            locationId: kitchen.id,
            type: ItemType.SMOKE_DETECTOR,
            category: ItemCategory.SECURITY,
            title: 'Kitchen',
            values: <SmokeDetectorValues> {
                smoke: false,
                co2: 485
            }
        };

        ItemActions.addItem(radioSwitch);
        //ItemActions.addItem(light);
        ItemActions.addItem(smokeDetector);

        var bodyWeight = <ItemModel> {
            id: RetroUUID.generateUUID(),
            locationId: bathroom.id,
            type: ItemType.BODY_WEIGHT,
            category: ItemCategory.APPLIANCES,
            title: 'Withings',
            values: <BodyWeightValues> {
                weight: 73,
                fat: 18.2,
                bmi: 24.4
            }
        };

        var dimmer = <ItemModel> {
            id: RetroUUID.generateUUID(),
            locationId: bathroom.id,
            type: ItemType.DIMMER,
            category: ItemCategory.LIGHTING,
            title: 'Bathroom',
            values: <DimmerValues> {
                current: 50
            }
        };

        ItemActions.addItem(bodyWeight);
        //ItemActions.addItem(dimmer);

        var colorLight = <ItemModel> {
            id: RetroUUID.generateUUID(),
            locationId: bedroom.id,
            type: ItemType.COLOR_LIGHT,
            category: ItemCategory.LIGHTING,
            title: 'Bedroom',
            values: <ColorLightValues> {
                on: false,
                color: '#4183D7'
            }
        };

        //ItemActions.addItem(colorLight);

        var doorLockValues = <ItemModel> {
            id: RetroUUID.generateUUID(),
            locationId: hall.id,
            type: ItemType.DOOR_LOCK,
            category: ItemCategory.SECURITY,
            title: 'Frontdoor',
            values: <DoorLockValues> {
                closed: false
            }
        };

        ItemActions.addItem(doorLockValues);

        var garagedoor = <ItemModel> {
            id: RetroUUID.generateUUID(),
            locationId: garage.id,
            type: ItemType.GARAGE_DOOR,
            category: ItemCategory.CAR,
            title: '',
            values: <GarageDoorValues> {
                closed: false
            }
        };
        ItemActions.addItem(garagedoor);


    }
}