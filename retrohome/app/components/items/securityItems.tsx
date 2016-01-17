/// <reference path="../../../typings/react/react.d.ts" />
import React = require('react');
import {ItemModel} from "../../models/itemModel";
import {CommandType} from "../../models/commandModel";
import {SingleItemComponentProps} from "./items";
import {DoorLockValues, WindowContactValues, SmokeDetectorValues} from "../../models/itemModel";
import {CommandActions} from "../../actions/commandActions";
var Switch = require('rc-switch');

export class CCTVItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {

        let videoSrc = `/api/items/${this.props.item.id}/stream/play.m3u8`;
        let poster = `/api/items/${this.props.item.id}/capture.jpg`;

        return (
            <div>

                <div className="panel no-border bg-primary">
                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Camera</div>
                    </div>
                    <div className="panel-body">
                        <div className="padding-25">

                            <video width="352" height="198" poster={poster} controls>
                                <source src={videoSrc} type="application/x-mpegurl" />
                                <source src={videoSrc} type="application/vnd.apple.mpegurl" />
                            </video>

                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export class DoorLockItemComponent extends React.Component<SingleItemComponentProps, any> {

    handleLock(value) {
        CommandActions.command(this.props.item, CommandType.SET_LOCK, value);
    }

    render() {
        var values:DoorLockValues = this.props.item.values;

        var bgClassName;
        if (values.closed) {
            bgClassName = 'bg-closed';
        } else {
            bgClassName = 'bg-open';
        }

        var doorLockValue;
        if (values.closed) {
            doorLockValue = <h1 className="text-white semi-bold animated pulse">CLOSED</h1>
        } else {
            doorLockValue = <h1 className="text-white semi-bold animated pulse">OPEN</h1>
        }

        return (
            <div>

                <div className={"panel no-border " + bgClassName }>
                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Doorlock</div>
                    </div>
                    <div className="panel-body">
                        <div className="padding-25">

                            {doorLockValue}

                            <div>

                                <Switch checked={values.closed} onChange={this.handleLock.bind(this)}/>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export class WindowContactItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        var values:WindowContactValues = this.props.item.values;

        var bgClassName;
        if (values.closed) {
            bgClassName = 'bg-closed';
        } else {
            bgClassName = 'bg-open';
        }

        var windowContactValue;
        if (values.closed) {
            windowContactValue = <h1 className="text-white semi-bold animated pulse">CLOSED</h1>
        } else {
            windowContactValue = <h1 className="text-white semi-bold animated pulse">OPEN</h1>
        }


        return (
            <div>

                <div className={"panel no-border " + bgClassName }>
                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Window contact</div>
                    </div>
                    <div className="panel-body">
                        <div className="padding-25">
                            {windowContactValue}
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export class WindowShutterItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div>


            </div>
        )
    }

}

export class SmokeDetectorItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        var values:SmokeDetectorValues = this.props.item.values;

        var bgClassName;
        if (values.smoke) {
            bgClassName = 'bg-danger';
        } else {
            bgClassName = 'bg-success';
        }

        var smokeDetectorValue;
        if (values.smoke) {
            smokeDetectorValue = <h1 className="text-white semi-bold animated infinite wobble">ALARM</h1>
        }

        return (
            <div>
                <div className={"panel no-border widget " + bgClassName}>

                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Smoke Detector</div>
                    </div>

                    <div className="panel-body">
                        <div className="padding-25">
                            {smokeDetectorValue}
                            <div className="row">

                                <div className="col-md-12">
                                    <p className="pull-left">CO
                                        <sub>2</sub>
                                    </p>

                                    <p className="pull-right bold animated pulse">{values.co2}&nbsp;ppm</p>
                                </div>

                            </div>


                        </div>
                    </div>

                </div>
            </div>
        )
    }

}