export interface ActModel {
    itemId: string,
    deviceId: string,
    type: ActType,
    value: any
}

export enum ActType {
    SET_TEMP = 0,
    SET_COLOR = 1,
    SET_SWITCH = 2,
    SET_BRIGHTNESS = 3,
    SET_LOCK = 4
}

export interface SenseModel {
    itemId: string,
    deviceId: string
}


export interface ConfigurationModel {
    deviceId: string,
    type: ConfigurationType,
    values: ConfigurationValues
}

export enum ConfigurationType {
    PAIR = 0,

}

export interface ConfigurationValues {

}