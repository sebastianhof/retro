define(["require", "exports", 'lodash'], function (require, exports) {
    var RetroLocation = (function () {
        function RetroLocation($http, $q) {
            var _this = this;
            $http.get('/api/locations').success(function (data) { return _this.locations = data.locations; });
            this.getLocation = function (locationId) {
                var deferred = $q.defer();
                var location = _.find(_this.locations, { id: locationId });
                if (location != null) {
                    deferred.resolve(location);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise;
            };
        }
        return RetroLocation;
    })();
    exports.RetroLocation = RetroLocation;
});
