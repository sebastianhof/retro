'use strict';
import React, { NativeAppEventEmitter } from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {SettingsActions} from '../../actions/settingsActions'
import settingsStyles from './styles';

var RetroDiscovery = require('react-native').NativeModules.RetroDiscovery;

var {
    StyleSheet,
    Text,
    View,
    Modal,
    NetInfo
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
});

const EMPTY_VIEW = 0;
const CONNECT_TO_WIFI_PANE = 1;
const SEARCH_HUB_PANE = 2;
const HUB_NOT_FOUND_PANE = 3;
const HUB_CONFIGURATION_PANE = 4;
const CLOUD_CONFIGURATION_PANE = 5;
const SEARCH_TIMEOUT = 5000;

export class SetupConnectionViewContainer extends React.Component {

    state = {
        view: null,
        didFoundHub: false
    };

    componentDidMount() {

        NetInfo.fetch().done((reach) => {

            if (reach == 'wifi') {
                this.searchHub();
            } else {

                this.setState({
                    view: CONNECT_TO_WIFI_PANE
                });

            }

        });

    }

    cancel() {
        this.props.navigator.pop();
    }

    searchHub() {

        // onStart event
        NativeAppEventEmitter.addListener('RetroDiscovery:WillSearchRetroHub', () => {

            setTimeout(() => {
                RetroDiscovery.stopSearch();
            }, SEARCH_TIMEOUT);

        });


        // onFound event
        NativeAppEventEmitter.addListener('RetroDiscovery:FoundRetroHub', (body) => {

            if (body && body.name && body.name == 'RetroHub' && body.hostName) {

                this.setState({
                    view: HUB_CONFIGURATION_PANE,
                    didFoundHub: true,
                    hubId: body.id,
                    hubHost: body.hostName
                });

            }

        });

        // onStop event
        NativeAppEventEmitter.addListener('RetroDiscovery:DidStopSearchRetroHub', () => {

            if (!this.state.didFoundHub) {
                this.setState({
                    didFoundHub: false,
                    view: HUB_NOT_FOUND_PANE
                });
            }

        });

        // Error event
        NativeAppEventEmitter.addListener('RetroDiscovery:Error', (error) => {
            console.log(error);
        });


        this.setState({
            view: SEARCH_HUB_PANE
        });


        RetroDiscovery.searchRetroHub();

    }

    confirmHubConfiguration() {

        // TODO: go to hub configuration
        SettingsActions.setHubHost(this.state.hubHost);
        SettingsActions.connectToHub();
        this.props.navigator.pop();
        //this.setState({
        //    view: CLOUD_CONFIGURATION_PANE
        //});

    }

    confirmCloudConfiguration() {
        // TODO: Cloud setup not available yet
        SettingsActions.setHubHost(this.state.hubHost);
        SettingsActions.setUseCloud(true);
        SettingsActions.setCloudAccessToken(null);
        SettingsActions.connectToHub();
        this.props.navigator.pop();
    }

    skipCloudConfiguration() {
        SettingsActions.setHubHost(this.state.hubHost);
        SettingsActions.connectToHub();
        this.props.navigator.pop();
    }

    render() {

        //<Text style={settingsStyles.modalButton} onPress={this.searchHubManually.bind(this)}>Manual setup</Text>

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Setup connection', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: this.cancel.bind(this)
                    }}
                />
                <Modal animate={true} visible={this.state.view == CONNECT_TO_WIFI_PANE}>
                    <View style={settingsStyles.modalContainer}>
                        <Text style={settingsStyles.modalTitle}>Retro</Text>
                        <Text style={settingsStyles.modalText}>Please connect to wifi network</Text>
                        <Text style={settingsStyles.modalButton} onPress={this.cancel.bind(this)}>Cancel</Text>
                    </View>
                </Modal>
                <Modal animate={true} visible={this.state.view == SEARCH_HUB_PANE}>
                    <View style={settingsStyles.modalContainer}>
                        <Text style={settingsStyles.modalTitle}>Retro</Text>
                        <Text style={settingsStyles.modalText}>Searching for Retro hub in your network...</Text>
                    </View>
                </Modal>
                <Modal animate={true} visible={this.state.view  == HUB_NOT_FOUND_PANE}>
                    <View style={settingsStyles.modalContainer}>
                        <Text style={settingsStyles.modalTitle}>Retro</Text>
                        <Text style={settingsStyles.modalText}>Could not find Retro Hub in your network.</Text>
                        <Text style={settingsStyles.modalButton} onPress={this.searchHub.bind(this)}>Retry</Text>
                        <Text style={settingsStyles.modalButton} onPress={this.cancel.bind(this)}>Cancel</Text>
                    </View>
                </Modal>
                <Modal animate={true} visible={this.state.view  == HUB_CONFIGURATION_PANE}>
                    <View style={settingsStyles.modalContainer}>
                        <Text style={settingsStyles.modalTitle}>Retro</Text>
                        <Text style={settingsStyles.modalText}>Retro Hub has been found in your network.</Text>
                        <View style={settingsStyles.modalItemView}>
                            <Text style={settingsStyles.modalItemText}>Domain: </Text>
                            <Text style={[settingsStyles.modalItemText, {'fontWeight': '500'}]}>{this.state.hubHost}</Text>
                        </View>
                        <Text style={settingsStyles.modalButton}
                              onPress={this.confirmHubConfiguration.bind(this)}>Next</Text>
                    </View>
                </Modal>
                <Modal animate={true} visible={this.state.view  == CLOUD_CONFIGURATION_PANE}>
                    <View style={settingsStyles.modalContainer}>
                        <Text style={settingsStyles.modalTitle}>Retro</Text>
                        <Text style={settingsStyles.modalText}>Connect to cloud to access retro from anywhere.</Text>
                        <Text style={settingsStyles.modalText}>(Retro cloud is currently not available)</Text>
                        <Text style={settingsStyles.modalButton} onPress={this.skipCloudConfiguration.bind(this)}>Skip cloud setup</Text>
                    </View>
                </Modal>
            </View>
        )

    }

}

export const SetupConnectionView = connect(function mapStateToProps(state) {
    return {
        settings: state.settings
    }
})(SetupConnectionViewContainer);