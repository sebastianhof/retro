/// <reference path="../../typings/express/express.d.ts" />
import * as express from 'express';

export class DashboardApi {

    constructor(app:express.Express) {

        app.get('/api/dashboard', function (req, res, next) {
            res.send({dashboardItems: []});
        });

    }

}