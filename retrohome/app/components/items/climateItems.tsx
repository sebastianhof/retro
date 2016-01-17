/// <reference path="../../../typings/react/react.d.ts" />
import React = require('react');
import {ItemModel} from "../../models/itemModel";
import {CommandType} from "../../models/commandModel";
import {SingleItemComponentProps} from "./items";
import {ThermostatValues, WeatherStationValues} from "../../models/itemModel";
import {CommandActions} from "../../actions/commandActions";
var Nouislider = require('react-nouislider');

export class AirConditioningItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div></div>
        )
    }

}

export class AirPurifierItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div></div>
        )
    }

}

export class ThermostatItemComponent extends React.Component<SingleItemComponentProps, any> {

    handleTemperature(values) {
        CommandActions.command(this.props.item, CommandType.SET_TEMP, values[0]);
    }

    render() {
        var values:ThermostatValues = this.props.item.values;

        var bgClassName;
        if (values.temp > 25) {
            bgClassName = 'bg-temp-30';
        } else if (values.temp > 22) {
            bgClassName = 'bg-temp-25';
        } else if (values.temp > 18) {
            bgClassName = 'bg-temp-20';
        } else if (values.temp > 14) {
            bgClassName = 'bg-temp-15';
        } else if (values.temp > 0) {
            bgClassName = 'bg-temp-10';
        } else {
            bgClassName = 'bg-off';
        }

        var temperature;
        if (values.temp == 0) {
            temperature = <h1 className="text-white semi-bold inline animated pulse">OFF</h1>
        } else {
            temperature = <h1 className="text-white semi-bold inline animated pulse">{values.temp}°</h1>
        }

        var state;
        if (values.temp > values.currentTemp) {
            state = <h3 className="text-white inline">Heating</h3>
        } else if (values.temp < values.currentTemp) {
            state = <h3 className="text-white inline">Cooling</h3>
        } else {
            state = <h3 className="text-white inline">Holding</h3>
        }


        return (
            <div>
                <div className={"panel no-border thermostat " + bgClassName}>

                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Thermostat</div>
                    </div>

                    <div className="panel-body">
                        <div className="padding-25">
                            <div>
                                {temperature} {state}
                            </div>

                            <br/>

                            <div className="bg-master">

                                <Nouislider
                                    range={{min: 0, '1%': values.minTemp , max: values.maxTemp}}
                                    start={[values.temp]}
                                    onChange={this.handleTemperature.bind(this)}
                                    pips={{mode: 'values', values: [values.currentTemp], density: 4}}
                                />

                            </div>

                            <br />
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}


export class VentilatorItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div></div>
        )
    }

}

export class WeatherStationItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        var values:WeatherStationValues = this.props.item.values;

        return (
            <div>
                <div className="panel no-border bg-primary">

                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Weather station</div>
                    </div>

                    <div className="panel-body">
                        <div className="padding-25">
                            <h1 className="text-white semi-bold animated pulse">{values.temperature}°</h1>

                            <div className="row">
                                <div className="col-xs-12">
                                    <p className="pull-left">Humidity</p>

                                    <p className="pull-right bold animated pulse">{values.humidity} %</p>
                                </div>


                                <div className="col-xs-12">
                                    <p className="pull-left">Pressure</p>

                                    <p className="pull-right bold animated pulse">{values.airpressure} mbar</p>
                                </div>

                                <div className="col-xs-12">
                                    <p className="pull-left">CO
                                        <sub>2</sub>
                                    </p>

                                    <p className="pull-right bold animated pulse">{values.co2} ppm</p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }

}