/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
import * as _ from 'lodash';
import {IDevice} from "./../devices/idevice";
import {EventEmitter} from "events";
import {Maxcube} from "./../devices/maxcube";


export class RetroHub {
    private devices:Array<IDevice> = [];
    private eventEmitter;
    private static instance;

    constructor() {
        this.eventEmitter = new EventEmitter();
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
        // TODO: autodetect devices
        // Maxcube.setup('192.168.2.38');
    }

    public on(event, func:Function) {
        this.eventEmitter.on(event, func);
    }

    public once(event, func:Function) {
        this.eventEmitter.once(event, func);
    }

    public removeListener(event, func:Function) {
        this.eventEmitter.removeListener(event, func);
    }

    public emit(event, arg) {
        this.eventEmitter.emit(event, arg);
    }

    public hasDevice(id:String) {
        return _.find(this.devices, {id: id}) != null;
    }

    public getDevice(id:String) {
        return _.find(this.devices, {id: id});
    }

    public unregisterDevice(device:IDevice):boolean {

        if (this.hasDevice(device.id)) {
            _.remove(this.devices, {id: device.id});
            device.destruct();
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
            return true;
        }

    }

}