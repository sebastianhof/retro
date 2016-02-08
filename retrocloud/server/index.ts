/// <reference path="../typings/express/express.d.ts" />
import {RetroCloudAPI} from "./api";
'use strict';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import {RetroCloudIoAPI} from "./api-io";

/*
 * Express
 */
var app:express.Express = express();

/*
 * Body parser
 */
var bodyParser = require('body-parser');
app.use(bodyParser.json());
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
 * API
 */
RetroCloudAPI.init(app);

var server = http.createServer(app);
RetroCloudIoAPI.init(server);

server.listen(process.env.PORT || 8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Retro cloud is listening at http://%s:%s', host, port);
});
