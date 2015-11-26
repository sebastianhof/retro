define(["require", "exports", "../models/itemModel", 'lodash'], function (require, exports, itemModel_1) {
    var RetroItem = (function () {
        function RetroItem($http, $q) {
            this.getItemsByCategory = function (category) {
                var deferred = $q.defer();
                var url;
                switch (category) {
                    case itemModel_1.ItemCategory.CLIMATE:
                        url = 'api/items/climate';
                        break;
                    case itemModel_1.ItemCategory.LIGHTING:
                        url = 'api/items/lighting';
                        break;
                    case itemModel_1.ItemCategory.APPLIANCES:
                        url = 'api/items/appliances';
                        break;
                    case itemModel_1.ItemCategory.SECURITY:
                        url = 'api/items/security';
                        break;
                    case itemModel_1.ItemCategory.OUTDOOR:
                        url = 'api/items/outdoor';
                        break;
                    case itemModel_1.ItemCategory.CAR:
                        url = 'api/items/car';
                        break;
                }
                $http.get(url)
                    .success(function (data) {
                    _.forEach(data.items, function (item) {
                        RetroItem.managedItems[item.id] = item;
                    });
                    deferred.resolve(data.items);
                })
                    .error(function (err) { return deferred.reject(err); });
                return deferred.promise;
            };
            this.getItemsByLocation = function (locationId) {
                var deferred = $q.defer();
                $http.get('api/items/rooms/' + locationId)
                    .success(function (data) {
                    _.forEach(data.items, function (item) {
                        RetroItem.managedItems[item.id] = item;
                    });
                    deferred.resolve(data.items);
                })
                    .error(function (err) { return deferred.reject(err); });
                return deferred.promise;
            };
        }
        RetroItem.managedItems = {};
        return RetroItem;
    })();
    exports.RetroItem = RetroItem;
});
