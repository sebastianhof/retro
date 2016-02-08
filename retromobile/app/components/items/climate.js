'use strict';
import React from  'react-native';
import {ItemActions} from '../../actions/itemActions'
import {ActType} from '../../models/commandModel'
import itemStyles from './styles'

var {
    Text,
    View,
    SliderIOS,
    PanResponder
    } = React;

export class AirConditioningView extends React.Component {

    render() {
        return (
            <View></View>
        )
    }

}

export class AirPurifierView extends React.Component {

    render() {
        return (
            <View></View>
        )
    }

}

export class ThermostatView extends React.Component {

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onPanResponderTerminationRequest: () => false,
            onStartShouldSetPanResponderCapture: () => true
        });
    }

    handeSlideComplete(value) {
        ItemActions.act(this.props.item, ActType.SET_TEMP, value);
    }

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.temp > 25) {
            backgroundColor = '#CD4945';
        } else if (values.temp > 22) {
            backgroundColor = '#F55753';
        } else if (values.temp > 18) {
            backgroundColor = '#F8D053';
        } else if (values.temp > 14) {
            backgroundColor = '#48B0F7';
        } else if (values.temp > 0) {
            backgroundColor = '#3C93CE';
        } else {
            backgroundColor = '#939393';
        }

        let temperature;
        if (values.temp == 0) {
            temperature = <Text style={[itemStyles.itemMainValue]}>OFF</Text>
        } else {
            temperature = <Text style={[itemStyles.itemMainValue]}>{values.temp}°</Text>
        }

        let state;
        if (values.temp > values.currentTemp) {
            state = <Text style={[itemStyles.itemValue]}>Heating</Text>
        } else if (values.temp < values.currentTemp) {
            state = <Text style={[itemStyles.itemValue]}>Cooling</Text>
        } else {
            state = <Text style={[itemStyles.itemValue]}>Holding</Text>
        }

        return (<View style={[itemStyles.container, { backgroundColor: backgroundColor}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} thermostat</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {temperature}
                {state}
            </View>
            <SliderIOS {...this.panResponder.panHandlers} style={itemStyles.itemSlider} minimumValue={0} maximumValue={values.maxTemp} value={values.temp}
                       minimumTrackTintColor="#ffffff" onSlidingComplete={this.handeSlideComplete.bind(this)}/>
        </View>);

    }

}

export class VentilatorView extends React.Component {

    render() {
        return (
            <View></View>
        )
    }

}

export class WeatherStationView extends React.Component {

    render() {
        let values = this.props.item.values;

        let pressure;
        if (values.pressure != null) {
            pressure = (<View style={itemStyles.itemPropertyValueContainer}>
                <Text style={[itemStyles.itemPropertyKey]}>Pressure</Text>
                <Text style={[itemStyles.itemPropertyValue]}>{values.pressure} mbar</Text>
            </View>);
        }

        let feelsLike;
        if (values.feelsLike != null) {
            feelsLike = (<View style={itemStyles.itemPropertyValueContainer}>
                <Text style={[itemStyles.itemPropertyKey]}>Feels Like</Text>
                <Text style={[itemStyles.itemPropertyValue]}>{values.feelsLike}°</Text>
            </View>);
        }

        let humidity;
        if (values.humidity != null) {
            humidity = (<View style={itemStyles.itemPropertyValueContainer}>
                <Text style={[itemStyles.itemPropertyKey]}>Humidity</Text>
                <Text style={[itemStyles.itemPropertyValue]}>{values.humidity} %</Text>
            </View>);
        }

        let co2;
        if (values.co2 != null) {
            co2 = (<View style={itemStyles.itemPropertyValueContainer}>
                <Text style={[itemStyles.itemPropertyKey]}>CO₂</Text>
                <Text style={[itemStyles.itemPropertyValue]}>{values.co2} ppm</Text>
            </View>);
        }

        return (<View style={[itemStyles.container, { backgroundColor: '#6d5cae'}]}>
                <Text style={[itemStyles.itemTitle]}>{this.props.item.title} weather station</Text>
                <Text style={[itemStyles.itemMainValue]}>{values.temperature}°</Text>
                {pressure}
                {feelsLike}
                {humidity}
                {co2}
            </View>
        )

    }

}