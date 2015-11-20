export class ItemType {
    static THERMOSTAT = 'thermostat';
    static WEATHERSTATION = 'weatherstation';
    static LIGHT = 'light';
    static COLORLIGHT = 'colorlight';
    static DIMMER = 'dimmer';
    static COLORDIMMER = 'colordimmer';
    static SWITCH = 'switch';
    static BODYWEIGHT = 'bodyweight';
    static HEART_RATE_MONITOR = 'heartrate';
    static DOORLOCK = 'doorlock';
    static WINDOW_CONTACT = 'windowcontact';
    static CCTV = 'cctv';
    static SMOKE_DETECTOR = 'smokedetector';
    static UNDEFINED = 'undefined';
}

export interface ItemModel {
    _id?: string,
    uuid: string,
    deviceId?: string,
    locationId?: string,
    type?: ItemType,
    title?: string,
    values?: ItemValues
}

export interface ItemValues {

}

export interface ThermostatValues extends ItemValues {
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