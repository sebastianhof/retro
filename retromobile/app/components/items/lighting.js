'use strict';
import React from 'react-native';
import {CommandActions} from '../../actions/commandActions'
import {CommandType} from '../../models/commandModel'
import itemStyles from './styles'

var {
    Text,
    View,
    Switch,
    SliderIOS
    } = React;

export class LightView extends React.Component {


    toggleLight(value) {
        CommandActions.command(this.props.item, CommandType.SET_SWITCH, value);
    }

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.on) {
            backgroundColor = '#F8D053';
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
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} light</Text>
            {value}
            <Switch tintColor="#6d5cae" onTintColor="#6d5cae" style={itemStyles.itemSwitch}
                    onValueChange={this.toggleLight.bind(this)}
                    value={values.on}/>
        </View>);
    }

}

export class DimmerView extends React.Component {

    handeSlideComplete(value) {
        CommandActions.command(this.props.item, CommandType.SET_BRIGHTNESS, value);
    }

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.current > 80) {
            backgroundColor = '#F8D053';
        } else if (values.current > 60) {
            backgroundColor = '#F9D975';
        } else if (values.current > 40) {
            backgroundColor = '#F7E2A1';
        } else if (values.current > 20) {
            backgroundColor = '#FCEDBD';
        } else if (values.current > 0) {
            backgroundColor = '#FEF6DD';
        } else {
            backgroundColor = '#939393';
        }

        let value;
        if (values.current == 0) {
            value = <Text style={[itemStyles.itemMainValue]}>Off</Text>
        } else {
            value = <Text style={[itemStyles.itemMainValue]}>{values.current}%</Text>
        }

        return (<View style={[itemStyles.container, { backgroundColor: backgroundColor}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} dimmer</Text>
            {value}
            <SliderIOS style={itemStyles.itemSlider} minimumValue={0} maximumValue={100} value={values.current}
                       minimumTrackTintColor="#ffffff" step={5} onSlidingComplete={this.handeSlideComplete.bind(this)}/>
        </View>);
    }

}

export class ColorLightView extends React.Component {

    toggleLight(value) {
        CommandActions.command(this.props.item, CommandType.SET_SWITCH, value);
    }

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.on) {
            backgroundColor = values.color;
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
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} color light</Text>
            {value}
            <Text>Color picker comes here</Text>
            <Switch tintColor="#6d5cae" onTintColor="#6d5cae" style={itemStyles.itemSwitch}
                    onValueChange={this.toggleLight.bind(this)}
                    value={values.on}/>
        </View>);
    }

}

export class ColorDimmerView extends React.Component {

    render() {
        return (<View></View>);
    }

}