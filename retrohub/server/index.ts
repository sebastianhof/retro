/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/express-validator/express-validator.d.ts" />
/// <reference path="../typings/passport/passport.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
'use strict';
import * as express from 'express';
import * as path from 'path';
import * as passport from 'passport';
import * as _ from 'lodash';
import * as http from 'http';
let expressValidator = require('express-validator');

import {RetroAPI} from "./api";
import {RetroHub} from "./hub";
import {RetroDemo} from "./demo";
import {RetroIoApi} from "./api-io";

import {Store} from "./stores/store";
import {UserModel} from "./models/userModel";
import {UserPasswordModel} from "./models/userModel";
import {RetroCloud} from "./cloud";

/*
 * Express
 */
var app:express.Express = express();

/*
 * Body parser
 */
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended: false}));

/*
 * Cookie parser
 */
var cookieParser = require('cookie-parser');
app.use(cookieParser());

/*
 * Express session
 */
var session = require('express-session');
app.use(session({
    secret: 'retro',
    resave: false,
    saveUninitialized: false
}));

/*
 * Passport
 */
app.use(passport.initialize());
app.use(passport.session());
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (userId, password, done) {

    let user:any = _.find(Store.getState().userPasswords, {userId: userId});
    if (user != null) {
        var bcrypt = require('bcrypt-nodejs');

        if (bcrypt.compareSync(password, user.password)) {
            done(null, user);
        } else {
            done(null, false, {message: 'Incorrect password.'});
        }

    } else {
        done(null, false, {message: 'User not found'});
    }

}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

/*
 * API
 */
RetroAPI.init(app);

/*
 * Retro Hub
 */
RetroHub.init();

/*
 * Retro Demo
 */
RetroDemo.init();

/*
 * Retro cloud
 *
 */
RetroCloud.init();

/*
 * Express server
 */
var server = http.createServer(app);
RetroIoApi.init(server);

server.listen(process.env.PORT || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Retro is listening at http://%s:%s', host, port);
});

/*
 * Bonjour server
 */
var bonjour = require('bonjour')();
bonjour.publish({name: 'RetroHub:123456789', type: 'http', port: 3000});

/*
 * TODO: socket.io
 */