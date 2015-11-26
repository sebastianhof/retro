/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
import 'lodash';
import {ItemModel, ItemCategory} from "../models/itemModel";


export class RetroItem {
    public getItemsByCategory:(category:ItemCategory) => angular.IPromise<Array<ItemModel>>;
    public getItemsByLocation:(locationId:string) => angular.IPromise<Array<ItemModel>>;
    public static managedItems = {};

    constructor($http:angular.IHttpService, $q:angular.IQService) {

        this.getItemsByCategory = (category:ItemCategory) => {
            var deferred = $q.defer();

            var url;
            switch (category) {
                case ItemCategory.CLIMATE:
                    url = 'api/items/climate';
                    break;
                case ItemCategory.LIGHTING:
                    url = 'api/items/lighting';
                    break;
                case ItemCategory.APPLIANCES:
                    url = 'api/items/appliances';
                    break;
                case ItemCategory.SECURITY:
                    url = 'api/items/security';
                    break;
                case ItemCategory.OUTDOOR:
                    url = 'api/items/outdoor';
                    break;
                case ItemCategory.CAR:
                    url = 'api/items/car';
                    break;
            }

            $http.get(url)
                .success((data:any) => {

                    _.forEach(data.items, (item:ItemModel) => {
                        RetroItem.managedItems[item.id] = item;
                    });

                    deferred.resolve(<Array<ItemModel>> data.items)
                })
                .error((err) => deferred.reject(err));

            return deferred.promise;
        };

        this.getItemsByLocation = (locationId:string) => {
            var deferred = $q.defer();

            $http.get('api/items/rooms/' + locationId)
                .success((data:any) => {

                    _.forEach(data.items, (item:ItemModel) => {
                        RetroItem.managedItems[item.id] = item;
                    });

                    deferred.resolve(<Array<ItemModel>> data.items)
                })
                .error((err) => deferred.reject(err));

            return deferred.promise;
        };

    }

}