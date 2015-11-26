define(["require", "exports", "./itemService", "./locationService", "./commandService", 'angular'], function (require, exports, itemService_1, locationService_1, commandService_1) {
    angular.module('retro.services', [])
        .service('RetroItem', ['$http', '$q', itemService_1.RetroItem])
        .service('RetroLocation', ['$http', '$q', locationService_1.RetroLocation])
        .service('RetroCommand', ['$http', '$q', '$timeout', commandService_1.RetroCommand]);
});
