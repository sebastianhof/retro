import {_} from 'lodash';

import {CommandType} from '../models/commandModel';
import {Store} from '../stores/store';


export const SEND_COMMAND = 'SEND_COMMAND';
export const CONFIRM_COMMAND = 'CONFIRM_COMMAND';

export class CommandActions {

    static command(item, commandType, value) {

        let clonedItem = _.cloneDeep(item);

        Store.dispatch({
            type: SEND_COMMAND,
            itemId: clonedItem.id,
            commandType: commandType,
            value: value
        });

        // TODO send

        switch (commandType) {
            case CommandType.SET_BRIGHTNESS:
                clonedItem.values['current'] = parseInt(value);
                break;
            case CommandType.SET_COLOR:
                clonedItem.values['color'] = value;
                break;
            case CommandType.SET_SWITCH:
                clonedItem.values['on'] = value;
                break;
            case CommandType.SET_TEMP:
                clonedItem.values['temp'] = parseInt(value);
                break;
            case CommandType.SET_LOCK:
                clonedItem.values['closed'] = value;
                break;
        }

        Store.dispatch({
            type: CONFIRM_COMMAND,
            item: clonedItem
        });

    }

}