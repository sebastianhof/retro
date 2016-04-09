export interface DeviceModel {
    id: string,
    type?: DeviceType,
    title?: string,
    values?: DeviceValues
}

export enum DeviceType {
    MAXCUBE = 0,
    PHILIPS_HUE_BRIDGE = 1,
    NETATMO_WEATHERSTATION = 2,
    NETATMO_WELCOME = 3,
    BELKIN_WEMO = 4,
    WITHINGS = 5
}

export interface DeviceValues {

}