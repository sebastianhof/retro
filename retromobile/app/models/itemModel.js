export const ItemType = {
    // climate
    THERMOSTAT: 10,
    WEATHER_STATION: 11,
    AIR_CONDITIONING: 12,
    AIR_PURIFIER: 13,
    VENTILATOR: 24,
    // lighting
    LIGHT: 20,
    COLOR_LIGHT: 21,
    DIMMER: 22,
    COLOR_DIMMER: 23,
    WINDOW_SHUTTER: 24,
    // appliances
    SWITCH: 300,
    BODY_WEIGHT: 301,
    HEART_RATE_MONITOR: 302,
    COFFEE_MACHINE: 303,
    COOKER_HOOD: 304,
    DISH_WASHER: 305,
    HOT_PLATE: 306,
    MICROWAVE: 307,
    OVEN: 308,
    REFRIGERATOR: 309,
    WASHING_MACHINE: 310,
    // security
    DOOR_LOCK: 40,
    WINDOW_CONTACT: 41,
    CCTV: 42,
    SMOKE_DETECTOR: 43,
    DOOR_CONTACT: 44,
    // outdoor
    PLANT_SENSOR: 50,
    // car
    GARAGE_DOOR: 60,
    // undefined
    UNDEFINED: 0
};

export const ItemCategory = {
    CLIMATE: 0,
    LIGHTING: 1,
    APPLIANCES: 2,
    SECURITY: 3,
    OUTDOOR: 4,
    CAR: 5
};

export function itemTypeToTitle(itemType) {

    switch (itemType) {
        case ItemType.AIR_CONDITIONING:
            return 'Air conditioning';
        case ItemType.AIR_PURIFIER:
            return 'Air purifier';
        case ItemType.BODY_WEIGHT:
            return 'Body weight';
        case ItemType.CCTV:
            return 'CCTV';
        case ItemType.COFFEE_MACHINE:
            return 'Coffee machine';
        case ItemType.COLOR_DIMMER:
            return 'Color dimmer';
        case ItemType.COLOR_LIGHT:
            return 'Color light';
        case ItemType.COOKER_HOOD:
            return 'Cooker hood';
        case ItemType.DIMMER:
            return 'Dimmer';
        case ItemType.DISH_WASHER:
            return 'Dish washer';
        case ItemType.DOOR_CONTACT:
            return 'Door contact';
        case ItemType.DOOR_LOCK:
            return 'Door lock';
        case ItemType.GARAGE_DOOR:
            return 'Garage door';
        case ItemType.HEART_RATE_MONITOR:
            return 'Heart rate monitor';
        case ItemType.HOT_PLATE:
            return 'Hot plate';
        case ItemType.LIGHT:
            return 'Light';
        case ItemType.MICROWAVE:
            return 'Microwave';
        case ItemType.OVEN:
            return 'Oven';
        case ItemType.PLANT_SENSOR:
            return 'Plant sensor';
        case ItemType.REFRIGERATOR:
            return 'Refrigerator';
        case ItemType.SMOKE_DETECTOR:
            return 'Smoke detector';
        case ItemType.SWITCH:
            return 'Switch';
        case ItemType.THERMOSTAT:
            return 'Thermostat';
        case ItemType.VENTILATOR:
            return 'Ventilator';
        case ItemType.WASHING_MACHINE:
            return 'Washing machine';
        case ItemType.WEATHER_STATION:
            return 'Weather station';
        case ItemType.WINDOW_CONTACT:
            return 'Window contact';
        case ItemType.WINDOW_SHUTTER:
            return 'Window shutter';
    }

}

export function itemCategoryToTitle(itemCategory) {

    switch (itemCategory) {
        case ItemCategory.APPLIANCES:
            return 'Appliances';
        case ItemCategory.CAR:
            return 'Car';
        case ItemCategory.CLIMATE:
            return 'Climate';
        case ItemCategory.LIGHTING:
            return 'Lighting';
        case ItemCategory.OUTDOOR:
            return 'Outdoor';
        case ItemCategory.SECURITY:
            return 'Security';
        default:
            return '';
    }

}