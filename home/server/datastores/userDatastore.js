var q = require('q');
var Datastore = require('nedb');
(function (UserRole) {
    UserRole[UserRole["ADMIN"] = 0] = "ADMIN";
    UserRole[UserRole["USER"] = 1] = "USER";
})(exports.UserRole || (exports.UserRole = {}));
var UserRole = exports.UserRole;
var UserDatastore = (function () {
    function UserDatastore() {
        this.datastore = new Datastore();
    }
    UserDatastore.getInstance = function () {
        if (UserDatastore.instance == null) {
            UserDatastore.instance = new UserDatastore();
        }
        return UserDatastore.instance;
    };
    UserDatastore.init = function () {
        if (UserDatastore.instance == null) {
            UserDatastore.instance = new UserDatastore();
        }
    };
    UserDatastore.prototype.getUser = function (query) {
        var deferred = q.defer();
        this.datastore.findOne(query, function (err, user) {
            if (err) {
                console.log(err);
                deferred.reject(500);
            }
            else if (user == null) {
                deferred.reject(404);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    };
    UserDatastore.prototype.addUser = function (user) {
        var datastore = this.datastore;
        var deferred = q.defer();
        datastore.findOne({ username: user.username }, function (err, existingUser) {
            if (err) {
                console.log(err);
                deferred.reject(500);
            }
            else if (existingUser != null) {
                deferred.reject(400);
            }
            else {
                datastore.insert(user, function (err, doc) {
                    if (err) {
                        console.log(err);
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    };
    return UserDatastore;
})();
exports.UserDatastore = UserDatastore;
