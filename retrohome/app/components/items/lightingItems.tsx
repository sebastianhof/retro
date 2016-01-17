/// <reference path="../../../typings/react/react.d.ts" />
import React = require('react');
import {ItemModel} from "../../models/itemModel";
import {CommandType} from "../../models/commandModel";
import {SingleItemComponentProps} from "./items";
import {LightValues,ColorLightValues,DimmerValues,ColorDimmerValues} from "../../models/itemModel";
import {CommandActions} from "../../actions/commandActions";
var Nouislider = require('react-nouislider');
var ColorPicker = require('react-color');
var Switch = require('rc-switch');

export class LightItemComponent extends React.Component<SingleItemComponentProps, any> {

    handleSwitch(value) {
        CommandActions.command(this.props.item, CommandType.SET_SWITCH, value);
    }

    render() {
        var values:LightValues = this.props.item.values;

        var bgClassName;
        if (values.on) {
            bgClassName = 'bg-light-100';
        } else {
            bgClassName = 'bg-off';
        }

        var light;
        if (values.on) {
            light = <h1 className="text-white semi-bold animated pulse">ON</h1>
        } else {
            light = <h1 className="text-white semi-bold animated pulse">OFF</h1>
        }

        return (
            <div>

                <div className={'panel no-border ' + bgClassName}>
                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Light</div>
                    </div>
                    <div className="panel-body">
                        <div className="padding-25">

                            {light}

                            <div>

                                <Switch checked={values.on} onChange={this.handleSwitch.bind(this)}/>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export class ColorLightItemComponent extends React.Component<SingleItemComponentProps, any> {

    handleColor(color) {
        CommandActions.command(this.props.item, CommandType.SET_COLOR, color);
    }

    handleSwitch(value) {
        CommandActions.command(this.props.item, CommandType.SET_SWITCH, value);
    }

    render() {
        var values:ColorLightValues = this.props.item.values;

        var bgClassName;
        var bgStyle = {};
        if (values.on) {
            bgStyle = {
                'background-color': values.color
            }
        } else {
            bgClassName = 'bg-off';
        }

        var light;
        if (values.on) {
            light = <h1 className="text-white semi-bold animated pulse">ON</h1>
        } else {
            light = <h1 className="text-white semi-bold animated pulse">OFF</h1>
        }


        return (
            <div>

                <div className={"panel no-border " + bgClassName} style={ bgStyle }>
                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Color Light</div>
                    </div>
                    <div className="panel-body">
                        <div className="padding-25">

                            {light}

                            <div>

                                <Switch checked={values.on} onChange={this.handleSwitch.bind(this)}/>

                            </div>

                        </div>
                        <div className="text-center">

                            <ColorPicker type="slider" color={values.color} onChange={ this.handleColor.bind(this) }/>

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export class DimmerComponent extends React.Component<SingleItemComponentProps, any> {

    handleBrightness(values) {
        CommandActions.command(this.props.item, CommandType.SET_BRIGHTNESS, values[0]);
    }

    render() {
        var values:DimmerValues = this.props.item.values;

        var bgClassName;
        if (values.current > 80) {
            bgClassName = 'bg-light-100';
        } else if (values.current > 60) {
            bgClassName = 'bg-light-80';
        } else if (values.current > 40) {
            bgClassName = 'bg-light-60';
        } else if (values.current > 20) {
            bgClassName = 'bg-light-40';
        } else if (values.current > 0) {
            bgClassName = 'bg-light-20';
        } else {
            bgClassName = 'bg-off';
        }

        var light;
        if (values.current == 0) {
            light = <h1 className="text-white semi-bold animated pulse">OFF</h1>
        } else {
            light = <h1 className="text-white semi-bold animated pulse">{values.current}%</h1>
        }


        return (
            <div>

                <div className={"panel no-border " + bgClassName}>

                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Dimmer</div>
                    </div>
                    <div className="panel-body">
                        <div className="padding-25">

                            {light}

                            <div className="bg-master">

                                <Nouislider
                                    range={{min: 0, max: 100}}
                                    step={5}
                                    onChange={this.handleBrightness.bind(this)}
                                    start={[values.current]}
                                />

                            </div>

                        </div>
                    </div>


                </div>

            </div>
        )

    }

}

export class ColorDimmerItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div></div>
        )
    }


}