/// <reference path="../../../typings/react/react.d.ts" />
import React = require('react');
import {ItemModel} from "../../models/itemModel";
import {CommandType} from "../../models/commandModel";
import {SingleItemComponentProps} from "./items";
import {GarageDoorValues} from "../../models/itemModel";
import {CommandActions} from "../../actions/commandActions";
var Switch = require('rc-switch');


export class GarageDoorItemComponent extends React.Component<SingleItemComponentProps, any> {

    handleLock(value) {
        CommandActions.command(this.props.item, CommandType.SET_LOCK, value);
    }

    render() {
        var values:GarageDoorValues = this.props.item.values;

        var bgClassName;
        if (values.closed) {
            bgClassName = 'bg-closed';
        } else {
            bgClassName = 'bg-open';
        }

        var garageDoorValue;
        if (values.closed) {
            garageDoorValue = <h1 className="text-white semi-bold animated pulse">CLOSED</h1>
        } else {
            garageDoorValue = <h1 className="text-white semi-bold animated pulse">OPEN</h1>
        }

        return (
            <div>

                <div className={"panel no-border " + bgClassName}>
                    <div className="panel-heading">
                        <div className="panel-title">{this.props.item.title} Garage door</div>
                    </div>
                    <div className="panel-body">
                        <div className="padding-25">
                            {garageDoorValue}

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
