import {CommandType} from "../models/commandModel";
import {RetroItem} from "./itemService";
import {ItemModel} from "../models/itemModel";
import {DimmerValues} from "../models/itemModel";
import {ColorLightValues} from "../models/itemModel";
import {SwitchValues} from "../models/itemModel";
import {ThermostatValues} from "../models/itemModel";

export class RetroCommand {
    public sendCommand:(itemId:string, command:CommandType, value:any) => angular.IPromise<any>;

    constructor($http:angular.IHttpService, $q:angular.IQService, $timeout:angular.ITimeoutService) {

        this.sendCommand = (itemId:string, command:CommandType, value:any) => {
            var deferred = $q.defer();

            // Intermediate solution: update managed item
            var item:ItemModel = RetroItem.managedItems[itemId];

            $timeout(function() {

                switch (command) {
                    case CommandType.SET_BRIGHTNESS:
                        (<DimmerValues> item.values).current = value;
                        break;
                    case CommandType.SET_COLOR:
                        (<ColorLightValues> item.values).color = value;
                        break;
                    case CommandType.SET_SWITCH:
                        (<SwitchValues> item.values).on = value;
                        break;
                    case CommandType.SET_TEMP:
                        (<ThermostatValues> item.values).temp = value;
                        break;
                }

                deferred.resolve();

            });

            // TODO send command and update item state

            return deferred.promise;
        }

    }
}