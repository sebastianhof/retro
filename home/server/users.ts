/// <reference path="typed/express/express.d.ts" />
import * as express from 'express';
import * as passport from 'passport';
import {UserDatastore} from "./datastores/userDatastore";
import {UserModel, UserRole} from "./datastores/userDatastore";

/**
 * User account management
 */
export class Users {

    constructor(app:express.Express) {

        app.post('/api/signin', passport.authenticate('local', {
            successRedirect: '/#/dashboard',
            failureRedirect: '/#/signinError'
        }));

        app.get('/api/signout', function(req, res){
            req.logout();
            res.redirect('/');
        });

        // add admin user
        var bcrypt = require('bcrypt-nodejs');
        var user = <UserModel> {
            username: 'admin',
            password: bcrypt.hashSync("retro"),
            role: UserRole.ADMIN,
            firstname: 'Retro',
            lastname: 'Administrator',
            email: 'admin@retro'
        };

        UserDatastore.getInstance().addUser(user).then(function (user) {
            console.log('Admin user successfully created');
        });


    }

}