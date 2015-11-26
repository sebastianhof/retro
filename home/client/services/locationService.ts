/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
import 'lodash';
import {LocationModel} from "../models/locationModel";

export class RetroLocation {
    public getLocation:(locationId:string) => angular.IPromise<LocationModel>;
    private locations:Array<LocationModel>;

    constructor($http:angular.IHttpService, $q:angular.IQService) {

        $http.get('/api/locations').success((data:any) => this.locations = data.locations);

        this.getLocation = (locationId:string) => {
            var deferred = $q.defer();

            var location = _.find(this.locations, {id: locationId});
            if (location != null) {
                deferred.resolve(location);
            } else {
                // TODO get from server
                deferred.reject();
            }

            return deferred.promise;
        }
    }

}