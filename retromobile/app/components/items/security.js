'use strict';
import React from 'react-native';
import {CommandActions} from '../../actions/commandActions'
import {CommandType} from '../../models/commandModel'
import itemStyles from './styles'

const CLOSED_COLOR = '#10CFBD';
const OPEN_COLOR = '#F55753';

var {
    StyleSheet,
    Text,
    View,
    Switch,
    SliderIOS
    } = React;

var styles = StyleSheet.create({
    cctvView: {
        height: 250,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16
    }
});

export class CCTVView extends React.Component {

    render() {

        return (<View style={[itemStyles.container, { backgroundColor: '#6d5cae'}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} camera</Text>
            <View style={styles.cctvView}>
                <Text>Camera preview comes here</Text>
            </View>
        </View>);

    }

}

export class DoorLockView extends React.Component {


    toggleLock(value) {
        CommandActions.command(this.props.item, CommandType.SET_LOCK, value);
    }

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.closed) {
            backgroundColor = CLOSED_COLOR;
        } else {
            backgroundColor = OPEN_COLOR;
        }

        let value;
        if (values.closed) {
            value = <Text style={[itemStyles.itemMainValue]}>Closed</Text>
        } else {
            value = <Text style={[itemStyles.itemMainValue]}>Open</Text>
        }

        return (<View style={[itemStyles.container, { backgroundColor: backgroundColor}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} door lock</Text>
            {value}
            <Switch tintColor="#6d5cae" onTintColor="#6d5cae" style={itemStyles.itemSwitch}
                    onValueChange={this.toggleLock.bind(this)}
                    value={values.closed}/>
        </View>);
    }

}

export class WindowContactView extends React.Component {

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.closed) {
            backgroundColor = CLOSED_COLOR;
        } else {
            backgroundColor = OPEN_COLOR;
        }

        let value;
        if (values.closed) {
            value = <Text style={[itemStyles.itemMainValue]}>Closed</Text>
        } else {
            value = <Text style={[itemStyles.itemMainValue]}>Open</Text>
        }

        return (<View style={[itemStyles.container, { backgroundColor: backgroundColor}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} window contact</Text>
            {value}
        </View>);
    }

}

export class DoorContactView extends React.Component {

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.closed) {
            backgroundColor = CLOSED_COLOR;
        } else {
            backgroundColor = OPEN_COLOR;
        }

        let value;
        if (values.closed) {
            value = <Text style={[itemStyles.itemMainValue]}>Closed</Text>
        } else {
            value = <Text style={[itemStyles.itemMainValue]}>Open</Text>
        }

        return (<View style={[itemStyles.container, { backgroundColor: backgroundColor}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} door contact</Text>
            {value}
        </View>);
    }

}

export class SmokeDetectorView extends React.Component {

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.smoke) {
            backgroundColor = '#F55753';
        } else if (values.co2 < 800) {
            backgroundColor = '10CFBD';
        } else if (values.co2 < 1600) {
            backgroundColor = '#F8D053';
        } else {
            backgroundColor = '#F55753';
        }

        let value;
        if (values.smoke) {
            value = <Text style={[itemStyles.itemMainValue]}>Smoke detected</Text>
        } else if (values.co2 < 800) {
            value = <Text style={[itemStyles.itemMainValue]}>Good</Text>
        } else if (values.co2 < 1600) {
            value = <Text style={[itemStyles.itemMainValue]}>Average</Text>
        } else {
            value = <Text style={[itemStyles.itemMainValue]}>Warning</Text>
        }

        let co2;
        if (values.co2 != null) {
            co2 = (<View style={itemStyles.itemPropertyValueContainer}>
                <Text style={[itemStyles.itemPropertyKey]}>CO₂</Text>
                <Text style={[itemStyles.itemPropertyValue]}>{values.co2} ppm</Text>
            </View>);
        }

        return (<View style={[itemStyles.container, { backgroundColor: backgroundColor}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} smoke detector</Text>
            {value}
            {co2}
        </View>);

    }
}