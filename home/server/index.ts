/// <reference path="typed/express/express.d.ts" />
import * as express from 'express';
import * as path from 'path';

var app:express.Express = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/app.html'));
});

app.use(express.static(path.join(__dirname, '../client')));

// setup modules
import dashboard = require('./dashboard');
import devices = require('./devices');
import items = require('./items');
import locations = require('./locations');
import rules = require('./rules');
import users = require('./users');
import hub = require('./hub');

// init hub
hub.RetroHub.init();

new dashboard.Dashboard(app);
new devices.Devices(app);
new items.Items(app);
new locations.Locations(app);
new rules.Rules(app);
new users.Users(app);


// start server
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Homehub home is listening at http://%s:%s', host, port);
});
