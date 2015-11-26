/// <reference path="../../typings/angularjs/angular.d.ts" />
import 'angular';
import {RetroItem} from "./itemService";
import {RetroLocation} from "./locationService";
import {RetroCommand} from "./commandService";

angular.module('retro.services', [])
    .service('RetroItem', ['$http', '$q', RetroItem])
    .service('RetroLocation', ['$http', '$q', RetroLocation])
    .service('RetroCommand', ['$http', '$q', '$timeout', RetroCommand]);