'use strict';
import React from  'react-native';
import _ from 'lodash';

import {connect} from 'react-redux';
import itemStyles from '../items/styles';
import {itemTypeToTitle, ItemType} from '../../models/itemModel';

import {ThermostatView, WeatherStationView} from '../items/climate';
import {LightView, DimmerView, ColorLightView, ColorDimmerView} from '../items/lighting';
import {SwitchView, BodyWeightView} from '../items/appliances';
import {CCTVView, DoorLockView, DoorContactView, WindowContactView, SmokeDetectorView} from '../items/security';
import {GarageDoorView} from '../items/car';

var {
    StyleSheet,
    Text,
    View,
    } = React;

var styles = StyleSheet.create({});

class DashboardItemViewComponent extends React.Component {

    render() {

        let item = _.find(this.props.items, {id: this.props.itemId});
        if (item != null) {

            switch (item.type) {
                case ItemType.AIR_CONDITIONING:
                case ItemType.AIR_PURIFIER:
                    return (<Text key={item.id}>{item.title}</Text>);
                case ItemType.BODY_WEIGHT:
                    return (<BodyWeightView item={item}/>);
                case ItemType.CCTV:
                    return (<CCTVView item={item}/>);
                case ItemType.COFFEE_MACHINE:
                    return (<Text key={item.id}>{item.title}</Text>);
                case ItemType.COLOR_DIMMER:
                    return (<ColorDimmerView item={item}/>);
                case ItemType.COLOR_LIGHT:
                    return (<ColorLightView item={item}/>);
                case ItemType.COOKER_HOOD:
                    return (<Text key={item.id}>{item.title}</Text>);
                case ItemType.DIMMER:
                    return (<DimmerView item={item}/>);
                case ItemType.DISH_WASHER:
                    return (<Text key={item.id}>{item.title}</Text>);
                case ItemType.DOOR_CONTACT:
                    return (<DoorContactView item={item}/>);
                case ItemType.DOOR_LOCK:
                    return (<DoorLockView item={item}/>);
                case ItemType.GARAGE_DOOR:
                    return (<GarageDoorView item={item}/>);
                case ItemType.HEART_RATE_MONITOR:
                case ItemType.HOT_PLATE:
                    return (<Text key={item.id}>{item.title}</Text>);
                case ItemType.LIGHT:
                    return (<LightView item={item}/>);
                case ItemType.MICROWAVE:
                case ItemType.OVEN:
                case ItemType.PLANT_SENSOR:
                case ItemType.REFRIGERATOR:
                    return (<Text key={item.id}>{item.title}</Text>);
                case ItemType.SMOKE_DETECTOR:
                    return (<SmokeDetectorView item={item}/>);
                case ItemType.SWITCH:
                    return (<SwitchView item={item}/>);
                case ItemType.THERMOSTAT:
                    return (<ThermostatView item={item}/>);
                case ItemType.VENTILATOR:
                case ItemType.WASHING_MACHINE:
                    return (<Text key={item.id}>{item.title}</Text>);
                case ItemType.WEATHER_STATION:
                    return (<WeatherStationView item={item}/>);
                case ItemType.WINDOW_CONTACT:
                    return (<WindowContactView item={item}/>);
                case ItemType.WINDOW_SHUTTER:
                default:
                    return (<Text key={item.id}>{item.title}</Text>);
            }

        }



    }
}

export const DashboardItemView = connect(function mapStateToProps(state) {
    return {
        items: state.items,
        dashboard: state.dashboard
    }
})(DashboardItemViewComponent);