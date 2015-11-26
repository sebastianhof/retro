/// <reference path="../../typings/nedb/nedb.d.ts" />
/// <reference path="../../typings/q/Q.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
import * as _ from 'lodash';
import * as q from 'q';
import {RetroLogger, RetroError} from "../retro/utils";
import {UserModel} from "../models/userModel";
var Datastore = require('nedb');

export class UserDatastore {
    private static instance:UserDatastore;
    private datastore;

    constructor() {
        this.datastore = new Datastore();
    }

    static getInstance():UserDatastore {
        if (UserDatastore.instance == null) {
            UserDatastore.instance = new UserDatastore();
        }
        return UserDatastore.instance;
    }


    /**
     *
     * Get user
     *
     * @param query
     * @returns {Promise<T>}
     */
    public getUser(query:any) {
        var deferred = q.defer();

        this.datastore.findOne(query, function (err, user) {

            if (err) {
                RetroLogger.error(err);
                deferred.reject(RetroError.INTERNAL_ERROR);
            } else if (user == null) {
                deferred.reject(RetroError.NOT_FOUND);
            } else {
                deferred.resolve(user);
            }

        });

        return deferred.promise;
    }

    /**
     *
     * Upsert user
     *
     * @param user
     * @returns {Promise<T>}
     */
    public upsertUser(user:UserModel) {
        var deferred = q.defer();

        var $set:any = {};
        if (user.username != null) $set['username'] = user.username;
        if (user.password != null) $set['password'] = user.password;
        if (user.role != null) $set['role'] = user.role;
        if (user.firstname != null) $set['firstname'] = user.firstname;
        if (user.lastname != null) $set['lastname'] = user.lastname;
        if (user.email != null) $set['email'] = user.email;

        this.datastore.update({username: user.username}, {$set: $set}, {upsert: true}, function (err, newUser) {
            if (err) {
                RetroLogger.error(err);
                deferred.reject(RetroError.INTERNAL_ERROR);
            } else if (newUser != null) {
                deferred.resolve(newUser);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }


}