export enum DeviceType {
    MAXCUBE = 0
}

export interface DeviceModel {
    _id?: string,
    uuid: string,
    type?: DeviceType,
    title?: string,
    values?: DeviceValues
}

export interface DeviceValues {

}