export enum ItemType {
    // climate
    THERMOSTAT = 10,
    WEATHER_STATION = 11,
    AIR_CONDITIONING = 12,
    AIR_PURIFIER = 13,
    VENTILATOR = 24,
    // lighting
    LIGHT = 20,
    COLOR_LIGHT = 21,
    DIMMER = 22,
    COLOR_DIMMER = 23,
    WINDOW_SHUTTER = 24,
    // appliances
    SWITCH = 300,
    BODY_WEIGHT = 301,
    HEART_RATE_MONITOR = 302,
    COFFEE_MACHINE = 303,
    COOKER_HOOD = 304,
    DISH_WASHER = 305,
    HOT_PLATE = 306,
    MICROWAVE = 307,
    OVEN = 308,
    REFRIGERATOR = 309,
    WASHING_MACHINE = 310,
    // security
    DOOR_LOCK = 40,
    WINDOW_CONTACT = 41,
    CCTV = 42,
    SMOKE_DETECTOR = 43,
    // outdoor
    PLANT_SENSOR = 50,

    // car
    GARAGE_DOOR = 60,
    // undefined
    UNDEFINED = 0
}

export interface ItemModel {
    _id?: string,
    uuid: string, // unique
    deviceId?: string,
    locationId?: string,
    type?: ItemType,
    category?: ItemCategory,
    title?: string,
    isFavorite?: boolean,
    values?: ItemValues
}

export enum ItemCategory {
    CLIMATE = 0,
    LIGHTING = 1,
    APPLIANCES = 2,
    SECURITY = 3,
    OUTDOOR = 4,
    CAR = 5
}

export interface ItemValues {

}

export interface ThermostatValues extends ItemValues {
    temp?: number,
    currentTemp?: number,
    minTemp?: number,
    maxTemp?: number
}

export interface WeatherStationValues extends ItemValues {
    temperature?: number,
    humidity?: number,
    airpressure?: number,
    co2?: number
}

export interface LightValues extends ItemValues {
    on: boolean
}

export interface DimmerValues extends ItemValues {
    on: boolean,
    current?: number,
    min?: number,
    max?: number
}

export interface ColorLightValues extends ItemValues {
    on: boolean,
    color: string
}

export interface ColorDimmerValues extends ItemValues {
    on: boolean,
    color: string,
    current?: number,
    min?: number,
    max?: number
}

export interface SwitchValues extends ItemValues {
    on: boolean
}

export interface BodyWeightValues extends ItemValues {
    weight?: number,
    fat?: number
}

export interface HeartRateMonitorValues extends ItemValues {
    sys?: number,
    dia?: number,
    rate?: number
}

export interface DoorLockValues extends ItemValues {
    closed: boolean
}

export interface WindowContactValues extends ItemValues {
    closed: boolean
}

export interface SmokeDetectorValues extends ItemValues {
    smoke?: boolean,
    co2?: number
}

export interface GarageDoorValues extends ItemValues {
    closed: boolean
}

export interface AirConditioningValues extends ItemValues {
    temp?: number,
    currentTemp?: number,
    minTemp?: number,
    maxTemp?: number,
    fan?: number,
    on: boolean,
    cooling: boolean,
    heating: boolean
}

export interface AirPurifierValues extends ItemValues {
    outside?: number,
    inside?: number,
    on: boolean,
    fan?: number,
}

export interface CoffeeMachineValues extends ItemValues {
    mode?: string,
    modes?: [string],
}

export interface CookerHoodValues extends ItemValues {
    on: boolean,
    fan?: number
}

export interface DishWasherValues extends ItemValues {
    on: boolean,
    mode?: string,
    modes?: [string],
    finishTime?: Date,
    startTime?: Date,
}

export interface HotPlateValues extends ItemValues {
    minValues?: [number],
    maxValues?: [number],
    positions?: [string]
}

export interface MicrowaveValues extends ItemValues {
    on: boolean,
    mode?: string,
    modes?: [string]
    finishTime?: Date,
    startTime?: Date
}

export interface OvenValues extends ItemValues {
    maxTemp?: number,
    minTemp?: number,
    currTemp?: number,
    temp?: number,
    mode?: string,
    modes?: [string]
}

export interface RefrigeratorValues extends ItemValues {
    maxTemp?: number,
    minTemp?: number,
    currTemp?: number,
    temp?: number,
    fridgeMaxTemp?: number,
    fridgeMinTemp?: number,
    fridgeCurrTemp?: number,
    fridgeTemp?: number,
}

export interface VentilatorValues extends ItemValues {
    fan?: number
}

export interface WashingMachineValues extends ItemValues {
    temp?: number,
    rotationSpeed?: number,
    mode?: string,
    modes?: [string]
}

export interface WindowShutterValues extends ItemValues {
    value: number
}