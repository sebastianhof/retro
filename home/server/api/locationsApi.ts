/// <reference path="../typed/express/express.d.ts" />
/// <reference path="../typed/lodash/lodash.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
import * as express from 'express';
import * as _ from 'lodash';
import * as q from 'q';
import {RetroError} from "../retro/utils";
import {LocationDatastore} from "../datastores/locationDatastore";
import {LocationModel} from "../models/locationModel";

/**
 * Location management
 */
export class LocationsApi {

    constructor(app:express.Express) {

        /**
         * Get locations
         *
         * GET api/locations
         */
        app.get('/api/locations', function (req, res) {

            LocationDatastore.getInstance().getLocations().then(function (locations: Array<LocationModel>) {
                res.send({locations: _.map(_.sortBy(locations, 'title'), LocationsApi.toJson)});
            }, function (status:RetroError) {
                res.sendStatus(status);
            });

        });

        /**
         * Add location
         *
         * POST api/locations
         */
        app.post('/api/locations', function (req, res) {

            var location:LocationModel = <LocationModel> {
                title: req.body.title,
                type: req.body.type
            };

            LocationDatastore.getInstance().addLocation(location).then(function (location) {
                res.send(LocationsApi.toJson(location));
            }, function (status:RetroError) {
                res.sendStatus(status);
            });

        });

        /**
         * Edit location
         *
         * POST api/locations/:locationId
         */
        app.post('/api/locations/:locationId', function (req, res) {

            var location:LocationModel = <LocationModel> {
                _id: req.params.locationId,
                title: req.body.title,
                type: req.body.type
            };

            LocationDatastore.getInstance().updateLocation(location).then(function (location) {
                res.send(LocationsApi.toJson(location));
            }, function (status:RetroError) {
                res.sendStatus(status);
            });

        });

        /**
         * Delete location
         *
         * DELETE api/locations/:locationId
         */
        app.delete('/api/locations/:locationId', function (req, res) {

            // TODO

        });


    }

    private static toJson(location:LocationModel) {
        return {
            id: location._id,
            title: location.title,
            type: location.type
        }
    }

}