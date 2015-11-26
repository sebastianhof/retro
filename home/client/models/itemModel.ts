export enum ItemType {
    THERMOSTAT = 0,
    WEATHERSTATION = 1,
    LIGHT = 2,
    COLORLIGHT = 3,
    DIMMER = 4,
    COLORDIMMER = 5,
    SWITCH = 6,
    BODYWEIGHT = 7,
    HEART_RATE_MONITOR = 8,
    DOORLOCK = 9,
    WINDOW_CONTACT = 10,
    CCTV = 11,
    SMOKE_DETECTOR = 12,
    GARAGE_DOOR = 13,
    UNDEFINED = 14
}

export interface ItemModel {
    id: string, // unique
    isFavorite: boolean,
    deviceId?: string,
    locationId?: string,
    type: ItemType,
    title?: string,
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

export interface WeatherstationValues extends ItemValues {
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