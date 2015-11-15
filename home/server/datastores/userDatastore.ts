/// <reference path="../typed/nedb/nedb.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
/// <reference path="../typed/lodash/lodash.d.ts" />
import * as _ from 'lodash';
import * as q from 'q';
var Datastore = require('nedb');

export enum UserRole {
    ADMIN = 0,
    USER = 1
}

export interface UserModel {
    username: string,
    password: string,
    firstname?: string,
    lastname?: string,
    email?: string,
    role: UserRole
}

export class UserDatastore {
    private static instance;
    private datastore;

    constructor() {
        this.datastore = new Datastore();
    }

    static getInstance() {
        if (UserDatastore.instance == null) {
            UserDatastore.instance = new UserDatastore();
        }
        return UserDatastore.instance;
    }

    static init() {
        if (UserDatastore.instance == null) {
            UserDatastore.instance = new UserDatastore();
        }
    }

    public getUser(query:any) {
        var deferred = q.defer();

        this.datastore.findOne(query, function (err, user) {

            if (err) {
                console.log(err);
                deferred.reject(500);
            } else if (user == null) {
                deferred.reject(404);
            } else {
                deferred.resolve(user);
            }

        });

        return deferred.promise;
    }

    public addUser(user:UserModel) {
        var datastore = this.datastore;
        var deferred = q.defer();

        datastore.findOne({username: user.username}, function (err, existingUser) {

            if (err) {
                console.log(err);
                deferred.reject(500);
            } else if (existingUser != null) {
                deferred.reject(400);
            } else {

                datastore.insert(user, function (err, doc) {
                    if (err) {
                        console.log(err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });

            }

        });

        return deferred.promise;
    }


}