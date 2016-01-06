'use strict';
import React from  'react-native';
import {HubConnectionStatus} from '../models/settingsModel';
import { connect } from 'react-redux';
import {SettingsActions} from '../actions/settingsActions';
import {SetupConnectionView} from './settings/setupConnection';

var {
    StyleSheet,
    Text,
    View,
    NetInfo,
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center'
    },
    notificationTitle: {
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 32,
        alignSelf: 'center'
    },
    notification: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        alignSelf: 'center'
    },
    notificationButton: {
        alignSelf: 'center',
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        marginTop: 32,
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8
    }
});


export class NotificationViewComponent extends React.Component {

    update(props) {

        switch (props.settings['hubConnectionStatus']) {
            case HubConnectionStatus.CONNECTED:
            case HubConnectionStatus.CONNECTED_TO_CLOUD:
                props.onClose();
                break;
        }


    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps);
    }

    componentWillMount() {
        this.update(this.props);
    }

    connect() {

        NetInfo.fetch().done((reach) => {

            if (reach == 'wifi') {
                SettingsActions.connectToHub();
            } else if (reach == 'cell') {
                SettingsActions.connectToCloud();
            } else {
                SettingsActions.disconnectFromHub();
            }

        });

    }

    connectToCloud() {

        if (this.props.settings['useCloud']) {
            SettingsActions.connectToCloud();
        }

    }

    setupConnection() {

        this.props.onClose();

        if (this.props.navigator && this.props.navigator.push) {
            this.props.navigator.push({
                component: SetupConnectionView,
                title: 'Setup connection'
            });
        } else {
            console.log('Could not push view');
        }

    }

    render() {

        let notification;
        let action;
        switch (this.props.settings.hubConnectionStatus) {
            case HubConnectionStatus.NOT_CONNECTED:

                return (
                    <View style={styles.container}>
                        <Text style={styles.notificationTitle}>Retro</Text>
                        <Text style={styles.notification}>Not connected to retro hub.</Text>
                        <Text style={styles.notificationButton} onPress={this.connect.bind(this)}>Connect</Text>
                        <Text style={styles.notificationButton} onPress={this.setupConnection.bind(this)}>Setup
                            connection</Text>
                    </View>
                );

            case HubConnectionStatus.CONNECTING:

                return (
                    <View style={styles.container}>
                        <Text style={styles.notificationTitle}>Retro</Text>
                        <Text style={styles.notification}>Connecting to retro hub...</Text>
                        <Text style={styles.notificationButton} onPress={this.setupConnection.bind(this)}>Setup
                            connection</Text>
                    </View>
                );

            case HubConnectionStatus.NOT_FOUND:
                notification = (<Text style={styles.notification}>Could not found retro hub.</Text>);

                let cloud;
                if (this.props.settings.useCloud) {
                    cloud = (<Text style={styles.notificationButton} onPress={this.connectToCloud.bind(this)}>Connect to
                        cloud</Text>);
                }

                return (
                    <View style={styles.container}>
                        <Text style={styles.notificationTitle}>Retro</Text>
                        <Text style={styles.notification}>Could not found retro hub.</Text>
                        <Text style={styles.notificationButton} onPress={this.connect.bind(this)}>Retry</Text>
                        {cloud}
                        <Text style={styles.notificationButton} onPress={this.setupConnection.bind(this)}>Setup
                            connection</Text>
                    </View>
                );

            default:

                return (<View style={styles.container}>

                    </View>
                );

        }

    }

}

export const NotificationView = connect(function mapStateToProps(state) {
    return {
        settings: state.settings
    }
})(NotificationViewComponent);