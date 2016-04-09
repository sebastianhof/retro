/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/kue/kue.d.ts" />
/// <reference path="../typings/q/Q.d.ts" />
import * as _ from 'lodash';
import * as kue from 'kue';
import * as q from 'q';

import {ActModel, SenseModel, ConfigurationModel} from './models/commandModel';
import {DeviceModel} from './models/deviceModel';
import {ItemModel} from './models/itemModel';

import {ItemActions} from './actions/itemActions';
import {DeviceActions} from './actions/deviceActions';

import {IDevice} from "./devices/idevice";
import {EventEmitter} from "events";

import {Store} from './stores/store';

import {Maxcube} from "./devices/maxcube";
import {PhilipsHueBridge} from "./devices/philipshue";
import {NetatmoWeatherstation} from "./devices/netatmoWeatherstation";
import {NetatmoWelcome} from "./devices/netatmoWelcome";

var CronJob = require('cron').CronJob;

export class RetroHub {

    static ADD_ITEM_JOB = 'ADD_ITEM_JOB';
    static UPDATE_ITEM_JOB = 'UPDATE_ITEM_JOB';
    static REMOVE_ITEM_JOB = 'REMOVE_ITEM_JOB';
    static FIND_ITEM_JOB = 'FIND_ITEM_JOB';

    static ADD_DEVICE_JOB = 'ADD_DEVICE_JOB';
    static UPDATE_DEVICE_JOB = 'UPDATE_DEVICE_JOB';
    static REMOVE_DEVICE_JOB = 'REMOVE_DEVICE_JOB';
    static FIND_DEVICE_JOB = 'FIND_DEVICE_JOB';

    static ACT_JOB = 'ACT_JOB';
    static SENSE_JOB = 'SENSE_JOB';
    static CONFIGURE_JOB = 'CONFIGURE_JOB';

    private queue:kue.Queue;
    private devices:Array<IDevice> = [];
    private static instance;

    constructor() {

        if (process.env.REDISCLOUD_URL != null) {
            this.queue = kue.createQueue({
                redis: process.env.REDISCLOUD_URL
            });
        } else {
            this.queue = kue.createQueue();
        }

        /*
         * Default job processing
         */
        this.queue.process(RetroHub.ADD_ITEM_JOB, 1, (job, done) => {
            ItemActions.addItem(job.data);
            done();
        });

        this.queue.process(RetroHub.UPDATE_ITEM_JOB, 1, (job, done) => {
            ItemActions.updateItem(job.data);
            done();
        });

        this.queue.process(RetroHub.REMOVE_ITEM_JOB, 1, (job, done) => {
            ItemActions.removeItem(job.data.id);
            done();
        });

        this.queue.process(RetroHub.FIND_ITEM_JOB, 100, (job, done) => {
            let itemModel = <ItemModel> _.find(Store.getState().items, job.data);
            if (itemModel != null) {
                done(null, itemModel);
            } else {
                done(new Error('Item not found'));
            }
        });

        this.queue.process(RetroHub.ADD_DEVICE_JOB, 1, (job, done) => {
            DeviceActions.addDevice(job.data);
            done();
        });

        this.queue.process(RetroHub.UPDATE_DEVICE_JOB, 1, (job, done) => {
            DeviceActions.updateDevice(job.data);
            done();
        });

        this.queue.process(RetroHub.REMOVE_DEVICE_JOB, 1, (job, done) => {
            DeviceActions.removeDevice(job.data.id);
            done();
        });

        this.queue.process(RetroHub.FIND_DEVICE_JOB, 100, (job, done) => {
            let deviceModel = <DeviceModel> _.find(Store.getState().devices, job.data);
            if (deviceModel != null) {
                done(null, deviceModel);
            } else {
                done(new Error('Device not found'));
            }
        });

        this.queue.process(RetroHub.ACT_JOB, 100, (job, done) => {
            let act = <ActModel> job.data;

            let device = this.getDevice(act.deviceId);
            if (device != null) {
                device.act(act, done);
            } else {
                done(new Error('Device not found'));
            }

        });

        this.queue.process(RetroHub.SENSE_JOB, 100, (job, done) => {
            let sense = <SenseModel> job.data;

            let device = this.getDevice(sense.deviceId);
            if (device != null) {
                device.sense(sense, done);
            } else {
                done(new Error('Device not found'))
            }

        });

        this.queue.process(RetroHub.CONFIGURE_JOB, 100, (job, done) => {
            let configuration = <ConfigurationModel> job.data;

            let device = this.getDevice(configuration.deviceId);
            if (device != null) {
                device.configure(configuration, done);
            }
        });

        // Register schedule jobs

        new CronJob('*/10 * * * * *', () => {

            _.forEach(this.devices, (device) => {
                this.dispatchJob(RetroHub.SENSE_JOB, <SenseModel> {
                    deviceId: device.id
                });
            })

        }, null, true);

    }

    static getInstance() {
        if (RetroHub.instance == null) {
            RetroHub.instance = new RetroHub();
        }
        return RetroHub.instance;
    }

    static init() {
        if (RetroHub.instance == null) {
            RetroHub.instance = new RetroHub();
        }

        /*
         * auto disovery
         */

        PhilipsHueBridge.demoDiscover();
        Maxcube.demoDiscover();
        NetatmoWeatherstation.demoDiscover();
        NetatmoWelcome.demoDiscover();
    }

    /*
     * Job management
     */

    dispatchJob(job:string, data):Q.Promise<any> {
        var defer = q.defer();

        let createdJob = this.queue.create(job, data).save();

        createdJob.on('complete', function (result) {
            defer.resolve(result);
        });

        createdJob.on('failed', function (err) {
            defer.reject(err);
        });

        return defer.promise;
    }

    /*
     * Device management
     */

    public hasDevice(id:String) {
        return _.contains(this.devices, {id: id});
    }

    public getDevice(id:String):IDevice {
        return _.find(this.devices, {id: id});
    }

    public unregisterDevice(device:IDevice):boolean {

        if (this.hasDevice(device.id)) {
            _.remove(this.devices, {id: device.id});
            device.onUnregister();
            return true;
        } else {
            return false;
        }

    }

    public registerDevice(device:IDevice):boolean {

        if (this.hasDevice(device.id)) {
            return false;
        } else {
            this.devices.push(device);
            device.onRegister();
            return true;
        }

    }

}