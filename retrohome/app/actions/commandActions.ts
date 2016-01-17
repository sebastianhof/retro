import {CommandType} from "../models/commandModel";
import {ItemModel} from "../models/itemModel";
import {Store} from '../stores/store';

export const SEND_COMMAND = 'SEND_COMMAND';
export const CONFIRM_COMMAND = 'CONFIRM_COMMAND';

export class CommandActions {

    static command(item:ItemModel, commandType:CommandType, value:any) {

        Store.dispatch({
            type: SEND_COMMAND,
            itemId: item.id,
            commandType: commandType,
            value: value
        });

        // TODO send

        switch (commandType) {
            case CommandType.SET_BRIGHTNESS:
                item.values['current'] = parseInt(value);
                break;
            case CommandType.SET_COLOR:
                item.values['color'] = value;
                break;
            case CommandType.SET_SWITCH:
                item.values['on'] = value;
                break;
            case CommandType.SET_TEMP:
                item.values['temp'] = parseInt(value);
                break;
            case CommandType.SET_LOCK:
                item.values['closed'] = value;
                break;
        }

        Store.dispatch({
            type: CONFIRM_COMMAND,
            item: item
        });

    }

}