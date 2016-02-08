'use strict';
import React from 'react-native';
import {ItemActions} from '../../actions/itemActions'
import {ActType} from '../../models/commandModel'
import itemStyles from './styles'

import ColorPickerView from '../native/colorPicker';

var {
    Text,
    View,
    Switch,
    SliderIOS,
    PanResponder
    } = React;

export class LightView extends React.Component {


    toggleLight(value) {
        ItemActions.act(this.props.item, ActType.SET_SWITCH, value);
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

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onPanResponderTerminationRequest: () => false,
            onStartShouldSetPanResponderCapture: () => true
        });
    }

    handeSlideComplete(value) {
        ItemActions.act(this.props.item, ActType.SET_BRIGHTNESS, value);
    }

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.brightness > 80) {
            backgroundColor = '#F8D053';
        } else if (values.brightness > 60) {
            backgroundColor = '#F9D975';
        } else if (values.brightness > 40) {
            backgroundColor = '#F7E2A1';
        } else if (values.brightness > 20) {
            backgroundColor = '#FCEDBD';
        } else if (values.brightness > 0) {
            backgroundColor = '#FEF6DD';
        } else {
            backgroundColor = '#939393';
        }

        let value;
        if (values.brightness == 0 || !values.on) {
            value = <Text style={[itemStyles.itemMainValue]}>Off</Text>
        } else {
            value = <Text style={[itemStyles.itemMainValue]}>{values.brightness}%</Text>
        }

        return (<View style={[itemStyles.container, { backgroundColor: backgroundColor}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} dimmer</Text>
            {value}
            <SliderIOS {...this.panResponder.panHandlers} style={itemStyles.itemSlider} minimumValue={0} maximumValue={100} value={values.brightness}
                       minimumTrackTintColor="#ffffff" step={5} onSlidingComplete={this.handeSlideComplete.bind(this)}/>
        </View>);
    }

}

export class ColorLightView extends React.Component {

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onPanResponderTerminationRequest: () => false,
            onStartShouldSetPanResponderCapture: () => true
        });
    }

    toggleLight(value) {
        ItemActions.act(this.props.item, ActType.SET_SWITCH, value);
    }

    handleColorChange(event) {
        if (event.nativeEvent != null && event.nativeEvent.color != null) {
            ItemActions.act(this.props.item, ActType.SET_COLOR, {
                hue: event.nativeEvent.color.hue,
                saturation: event.nativeEvent.color.saturation
            });
        }
    }

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.on) {
            // TODO ct mode
            backgroundColor = '#939393';
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
            <ColorPickerView {...this.panResponder.panHandlers} style={{height: 200, marginLeft: 16, marginRight: 16}}
                             color={{hue:(values.hue), saturation:(values.saturation), brightness:(values.brightness)}}
                             onChange={this.handleColorChange.bind(this)}/>
        </View>);
    }

}

export class ColorDimmerView extends React.Component {

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onPanResponderTerminationRequest: () => false,
            onStartShouldSetPanResponderCapture: () => true
        });

        this.panResponder2 = PanResponder.create({
            onPanResponderTerminationRequest: () => false,
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true
        });
    }

    handleSlideComplete(value) {
        ItemActions.act(this.props.item, ActType.SET_BRIGHTNESS, value);
    }

    handleColorChange(event) {
        if (event.nativeEvent != null && event.nativeEvent.color != null) {
            ItemActions.act(this.props.item, ActType.SET_COLOR, {
                hue: event.nativeEvent.color.hue,
                saturation: event.nativeEvent.color.saturation
            });
        }
    }

    render() {
        let values = this.props.item.values;

        let backgroundColor;
        if (values.brightness == 0 || !values.on) {
            backgroundColor = '#939393';
        } else {
            if (values.mode == 0) {
                // Hue mode
                let brightness;
                if (values.brightness < 20) {
                    brightness = 20;
                } else if (values.brightness < 80) {
                    brightness = values.brightness;
                } else {
                    brightness = 80
                }

                backgroundColor = `hsl(${values.hue},${values.saturation}%,${brightness}%)`

            } else if (values.mode == 1) {
                // TODO ct mode
            }
        }

        let value;
        if (values.brightness == 0 || !values.on) {
            value = <Text style={[itemStyles.itemMainValue]}>Off</Text>
        } else {
            value = <Text style={[itemStyles.itemMainValue]}>{values.brightness}%</Text>
        }

        return (<View style={[itemStyles.container, { backgroundColor: backgroundColor}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} color dimmer</Text>
            {value}
            <SliderIOS {...this.panResponder.panHandlers} style={itemStyles.itemSlider} minimumValue={0}
                                                          maximumValue={100} value={values.brightness}
                                                          minimumTrackTintColor="#ffffff" step={5}
                                                          onSlidingComplete={this.handleSlideComplete.bind(this)}/>
            <ColorPickerView {...this.panResponder2.panHandlers} style={{height: 200, marginLeft: 16, marginRight: 16}}
                                                                color={{hue:(values.hue), saturation:(values.saturation), brightness:(values.brightness)}}
                                                                onChange={this.handleColorChange.bind(this)}/>
        </View>);
    }

}