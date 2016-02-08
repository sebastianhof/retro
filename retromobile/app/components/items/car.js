'use strict';
import React from 'react-native';
import {ItemActions} from '../../actions/itemActions'
import {ActType} from '../../models/commandModel'
import itemStyles from './styles'

const CLOSED_COLOR = '#10CFBD';
const OPEN_COLOR = '#F55753';

var {
    Text,
    View,
    Switch,
    SliderIOS
    } = React;


export class GarageDoorView extends React.Component {

    toggleLock(value) {
        ItemActions.act(this.props.item, ActType.SET_LOCK, value);
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
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} garage door</Text>
            {value}
            <Switch tintColor="#6d5cae" onTintColor="#6d5cae" style={itemStyles.itemSwitch}
                    onValueChange={this.toggleLock.bind(this)}
                    value={values.closed}/>
        </View>);
    }

}