'use strict';
import React from  'react-native';
import {ItemActions} from '../../actions/itemActions'
import {ActType} from '../../models/commandModel'
import itemStyles from './styles'

var {
    Text,
    View,
    Switch,
    SliderIOS
    } = React;

export class BodyWeightView extends React.Component {

    render() {
        let values = this.props.item.values;

        let fat;
        if (values.fat != null) {
            fat = (<View style={itemStyles.itemPropertyValueContainer}>
                <Text style={[itemStyles.itemPropertyKey]}>Fat mass</Text>
                <Text style={[itemStyles.itemPropertyValue]}>{values.fat}%</Text>
            </View>);
        }

        let bmi;
        if (values.bmi != null) {
            bmi = (<View style={itemStyles.itemPropertyValueContainer}>
                <Text style={[itemStyles.itemPropertyKey]}>BMI</Text>
                <Text style={[itemStyles.itemPropertyValue]}>{values.bmi}</Text>
            </View>);
        }

        return (<View style={[itemStyles.container, { backgroundColor: '#6d5cae'}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} body weight</Text>
            <Text style={[itemStyles.itemMainValue]}>{values.weight} kg</Text>
            {fat}
            {bmi}
        </View>);
    }

}


export class SwitchView extends React.Component {

    toggleSwitch(value) {
        ItemActions.act(this.props.item, ActType.SET_SWITCH, value);
    }

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.on) {
            backgroundColor = '#48B0F7';
        } else {
            backgroundColor = '#939393';
        }

        let value;
        if (values.on) {
            value = <Text style={[itemStyles.itemMainValue]}>On</Text>
        } else {
            value = <Text style={[itemStyles.itemMainValue]}>Off</Text>
        }

        return (<View style={[itemStyles.container, { backgroundColor: backgroundColor}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} switch</Text>
            {value}
            <Switch tintColor="#6d5cae" onTintColor="#6d5cae" style={itemStyles.itemSwitch}
                    onValueChange={this.toggleSwitch.bind(this)}
                    value={values.on}/>
        </View>);


    }

}