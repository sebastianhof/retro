import {LocationModel} from "./locationModel";
import {ItemModel} from "./itemModel";

export enum CommandType {
    SET_TEMP = 0,
    SET_COLOR = 1,
    SET_SWITCH = 2,
    SET_BRIGHTNESS = 3,

}

export interface CommandModel {
    command: string,
    item: ItemModel,
    location: LocationModel
}