/// <reference path="../../../typings/react/react.d.ts" />
import React = require('react');
import {ItemModel} from "../../models/itemModel";
import {CommandType} from "../../models/commandModel";

import {BodyWeightValues} from "../../models/itemModel";
import {SingleItemComponentProps} from "./items";
import {SwitchValues} from "../../models/itemModel";
import {CommandActions} from "../../actions/commandActions";
var Switch = require('rc-switch');

export class SwitchItemComponent extends React.Component<SingleItemComponentProps, any> {

    handleSwitch(value) {
        CommandActions.command(this.props.item, CommandType.SET_SWITCH, value);
    }

    render() {
        var values:SwitchValues = this.props.item.values;

        var bgClassName;
        if (values.on) {
            bgClassName = 'bg-on';
        } else {
            bgClassName = 'bg-off';
        }

        var switchValue;
        if (values.on) {
            switchValue = <h1 className="text-white semi-bold animated pulse">ON</h1>
        } else {
            switchValue = <h1 className="text-white semi-bold animated pulse">OFF</h1>
        }

        return (
            <div>
                <div className={"panel no-border " + bgClassName}>
                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Switch</div>
                    </div>
                    <div className="panel-body">
                        <div className="padding-25">

                            {switchValue}

                            <div>

                                <Switch checked={values.on} onChange={this.handleSwitch.bind(this)}/>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //class RetroSwitchController {
//    public value:string;
//    public itemId:string;
//
//    constructor($element, RetroCommand:RetroCommand) {
//        $element[0].checked = this.value;
//        $element[0].onchange = () => {
//            RetroCommand.sendCommand(this.itemId, CommandType.SET_SWITCH, $element[0].checked);
//        };
//
//        //new Switchery($element[0]);
//    }
//}
//


}

export class BodyWeightItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        let title:string = this.props.item.title;
        let values:BodyWeightValues = this.props.item.values;

        return (
            <div className="panel no-border bg-primary widget">
                <div className="panel-heading">
                    <div className="panel-title">{title} Bodyweight</div>
                </div>
                <div className="panel-body">
                    <div className="padding-25">
                        <h1 className="text-white semi-bold animated pulse">{values.weight} kg</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p className="pull-left">Body fat</p>

                            <p className="pull-right bold animated pulse">{values.fat} %</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export class HeartRateMonitorItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div>Heart rate monitor</div>
        )
    }

}


export class CoffeeMachineItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div>Coffee machine</div>
        )
    }

}

export class CookerHoodItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div>Cooker hood</div>
        )
    }

}

export class DishwasherItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div>Dishwasher</div>
        )
    }

}

export class HotPlateItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div>Hot Plate</div>
        )
    }

}

export class MicrowaveItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div>Microwave</div>
        )
    }

}

export class OvenItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div>Oven</div>
        )
    }

}

export class RefrigeratorItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div>Refrigerator</div>
        )
    }

}

export class WashingMachineItemComponent extends React.Component<SingleItemComponentProps, any> {

    render() {
        return (
            <div>Washing Machine</div>
        )
    }

}