var q = require('q');
var Datastore = require('nedb');
(function (DeviceType) {
    DeviceType[DeviceType["MAXCUBE"] = 0] = "MAXCUBE";
})(exports.DeviceType || (exports.DeviceType = {}));
var DeviceType = exports.DeviceType;
var DeviceDatastore = (function () {
    function DeviceDatastore() {
        this.datastore = new Datastore();
    }
    DeviceDatastore.getInstance = function () {
        if (DeviceDatastore.instance == null) {
            DeviceDatastore.instance = new DeviceDatastore();
        }
        return DeviceDatastore.instance;
    };
    DeviceDatastore.init = function () {
        if (DeviceDatastore.instance == null) {
            DeviceDatastore.instance = new DeviceDatastore();
        }
    };
    DeviceDatastore.prototype.addDevice = function (device) {
        var deferred = q.defer();
        this.datastore.insert(device, function (err, doc) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    };
    DeviceDatastore.prototype.getDevices = function () {
        var deferred = q.defer();
        this.datastore.find({}, function (err, docs) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            }
            else {
                deferred.resolve(docs);
            }
        });
        return deferred.promise;
    };
    DeviceDatastore.prototype.getDevice = function (query) {
        var deferred = q.defer();
        this.datastore.findOne(query, function (err, doc) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    };
    return DeviceDatastore;
})();
exports.DeviceDatastore = DeviceDatastore;
