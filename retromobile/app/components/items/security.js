'use strict';
import React from 'react-native';
import Video from 'react-native-video';
import NavigationBar from 'react-native-navbar';

import { connect } from 'react-redux'
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
    Image,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    cctvView: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16
    },
    cctvImage: {
        height: 200
    },
    cctvVideoContainer: {
        flex: 1,
        backgroundColor: '#000000'
    },
    cctvVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});

class CCTVVideoViewComponent extends React.Component {

    streamUrl() {
        return `${this.props.settings.connectionLink}/api/items/${this.props.item.id}/stream/play.m3u8`
    }

    render() {

        return (
            <View style={styles.cctvVideoContainer}>
                <TouchableHighlight style={styles.cctvVideo} onPress={() => this.props.navigator.pop()}>
                    <Video style={styles.cctvVideo} resizeMode="contain" source={{uri: this.streamUrl()}}/>
                </TouchableHighlight>
            </View>
        )
    }

}

export const CCTVVideoView = connect(function mapStateToProps(state) {
    return {
        settings: state.settings
    }
})(CCTVVideoViewComponent);


export class CCTVViewComponent extends React.Component {

    imageUrl() {
        return `${this.props.settings.connectionLink}/api/items/${this.props.item.id}/capture.jpg`
    }

    openVideo() {

        if (this.props.navigator != null) {
            this.props.navigator.push({
                component: () => {
                    return <CCTVVideoView navigator={this.props.navigator} item={this.props.item}/>
                },
                title: 'Video'
            });
        }
    }

    render() {

        console.log(this.props.navigator);

        return (<View style={[itemStyles.container, { backgroundColor: '#6d5cae'}]}>
            <Text style={[itemStyles.itemTitle]}>{this.props.item.title} camera</Text>
            <View style={styles.cctvView}>
                <TouchableHighlight onPress={this.openVideo.bind(this)}>
                    <Image style={styles.cctvImage}
                           source={{uri: this.imageUrl()}}
                           resizeMode="cover"
                    />
                </TouchableHighlight>
            </View>
        </View>);

    }

}

export const CCTVView = connect(function mapStateToProps(state) {
    return {
        settings: state.settings
    }
})(CCTVViewComponent);

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