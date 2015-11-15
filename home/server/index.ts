/// <reference path="typed/express/express.d.ts" />
/// <reference path="typed/passport/passport.d.ts" />
import * as express from 'express';
import * as path from 'path';
import * as passport from 'passport';
import {UserDatastore} from "./datastores/userDatastore";


// Express
var app:express.Express = express();

// Body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Cookie parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Express session
var session = require('express-session');
app.use(session({
    secret: 'retro',
    resave: false,
    saveUninitialized: false
}));

// View engine
app.set('view engine', 'jade');

// Passport
app.use(passport.initialize());
app.use(passport.session());
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, done) {

    UserDatastore.getInstance().getUser({username: username}).then(function (user) {

        var bcrypt = require('bcrypt-nodejs');
        if (bcrypt.compareSync(password, user.password)) {
            done(null, user);
        } else {
            done(null, false, {message: 'Incorrect password.'});
        }

    }, function (err) {
        done(null, false, {message: 'User not found'});
    })

}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Main view
app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.sendFile(path.join(__dirname, '../client/app.html'));
    } else {
        res.sendFile(path.join(__dirname, '../client/public.html'));
    }
});

// Static routes
app.use(express.static(path.join(__dirname, '../client')));

// Setup modules
import dashboard = require('./dashboard');
import devices = require('./devices');
import items = require('./items');
import locations = require('./locations');
import rules = require('./rules');
import users = require('./users');
import hub = require('./hub');

// Init hub
hub.RetroHub.init();

// Init modules
new dashboard.Dashboard(app);
new devices.Devices(app);
new items.Items(app);
new locations.Locations(app);
new rules.Rules(app);
new users.Users(app);

// Start server
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Retro is listening at http://%s:%s', host, port);
});
