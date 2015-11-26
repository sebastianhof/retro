define(["require", "exports", "../models/commandModel", "./itemService"], function (require, exports, commandModel_1, itemService_1) {
    var RetroCommand = (function () {
        function RetroCommand($http, $q, $timeout) {
            this.sendCommand = function (itemId, command, value) {
                var deferred = $q.defer();
                var item = itemService_1.RetroItem.managedItems[itemId];
                $timeout(function () {
                    switch (command) {
                        case commandModel_1.CommandType.SET_BRIGHTNESS:
                            item.values.current = value;
                            break;
                        case commandModel_1.CommandType.SET_COLOR:
                            item.values.color = value;
                            break;
                        case commandModel_1.CommandType.SET_SWITCH:
                            item.values.on = value;
                            break;
                        case commandModel_1.CommandType.SET_TEMP:
                            item.values.temp = value;
                            break;
                    }
                    deferred.resolve();
                });
                return deferred.promise;
            };
        }
        return RetroCommand;
    })();
    exports.RetroCommand = RetroCommand;
});
