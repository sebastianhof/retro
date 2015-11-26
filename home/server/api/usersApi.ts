/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/passport/passport.d.ts" />
import * as express from 'express';
import * as passport from 'passport';
import {UserDatastore} from "./../datastores/userDatastore";
import {RetroError} from "../retro/utils";
import {UserModel, UserRole} from "../models/userModel";
import {RetroAuth} from "../retro/utils";

/**
 * User account management
 */
export class UsersApi {

    constructor(app:express.Express) {

        /**
         * Sign in
         *
         * GET /api/signin
         */
        app.post('/api/signin', passport.authenticate('local', {
            successRedirect: '/#/dashboard',
            failureRedirect: '/#/signinError'
        }));

        /**
         * Sign out
         *
         * GET /api/signout
         */
        app.get('/api/signout', function (req, res) {
            req.logout();
            res.redirect('/');
        });

        /**
         * Get current user
         *
         * GET /api/user
         */
        app.get('/api/user', RetroAuth.isAuthenticated, function (req, res) {
            res.send(UsersApi.toJson(req.user));
        });

        /**
         * Add user
         *
         * POST /api/user
         */
        app.post('/api/user', RetroAuth.isAdmin, function (req, res) {

            var user:UserModel = <UserModel> {
                username: req.body.username,
                password: req.body.password,
                role: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email
            };

            UserDatastore.getInstance().upsertUser(user).then(function (user) {
                res.send(user);
            }, function (status:RetroError) {
                res.sendStatus(status);
            });

        });

        /**
         * Edit user
         *
         * POST /api/user/:userId
         */
        app.post('/api/user/:username', RetroAuth.isAdmin, function (req, res) {

            var user:UserModel = <UserModel> {
                username: req.params.username,
                role: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email
            };

            UserDatastore.getInstance().upsertUser(user).then(function (user) {
                res.send(user);
            }, function (status:RetroError) {
                res.sendStatus(status);
            });

        });

        /**
         * Edit user password
         *
         * POST /api/user/:userId/password
         */
        app.post('/api/user/password', RetroAuth.isAuthenticated, function (req, res) {

            var user:UserModel = <UserModel> {
                username: req.user.username,
                password: req.body.password,
            };

            UserDatastore.getInstance().upsertUser(user).then(function (user) {
                res.send(user);
            }, function (status:RetroError) {
                res.sendStatus(status);
            });

        });

        /**
         * Delete user
         */
        app.delete('/api/user/:username', RetroAuth.isAdmin, function (req, res) {

        });

        /*
         * Init
         */
        this.initAdmin();
    }

    private static toJson(user:any) {
        return {
            username: user.string,
            role: user.role,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }
    }

    private initAdmin() {
        var bcrypt = require('bcrypt-nodejs');
        var user = <UserModel> {
            username: 'admin',
            password: bcrypt.hashSync("retro"),
            role: UserRole.ADMIN,
            firstname: 'Retro',
            lastname: 'Administrator',
            email: 'admin@retro'
        };

        UserDatastore.getInstance().upsertUser(user).then(function (user) {
            console.log('Admin user successfully created');
        });
    }

}