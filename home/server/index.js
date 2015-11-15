/// <reference path="typed/express/express.d.ts" />
/// <reference path="typed/passport/passport.d.ts" />
var express = require('express');
var path = require('path');
var passport = require('passport');
var userDatastore_1 = require("./datastores/userDatastore");
// Express
var app = express();
// Body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
    userDatastore_1.UserDatastore.getInstance().getUser({ username: username }).then(function (user) {
        var bcrypt = require('bcrypt-nodejs');
        if (bcrypt.compareSync(password, user.password)) {
            done(null, user);
        }
        else {
            done(null, false, { message: 'Incorrect password.' });
        }
    }, function (err) {
        done(null, false, { message: 'User not found' });
    });
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
    }
    else {
        res.sendFile(path.join(__dirname, '../client/public.html'));
    }
});
// Static routes
app.use(express.static(path.join(__dirname, '../client')));
// Setup modules
var dashboard = require('./dashboard');
var devices = require('./devices');
var items = require('./items');
var locations = require('./locations');
var rules = require('./rules');
var users = require('./users');
var hub = require('./hub');
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
