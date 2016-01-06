'use strict';
import React, { NativeAppEventEmitter } from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {SettingsActions} from '../../actions/settingsActions'

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
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center'
    },
    modalTitle: {
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 32,
        alignSelf: 'center'
    },
    modalText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        alignSelf: 'center'
    },
    modalButton: {
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
    },
    modalItemView: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    modalItemText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300'
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
        view: EMPTY_VIEW,
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

            console.log('Setup connection: Stop searching hub');

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

    searchHubManually() {

    }

    confirmHubConfiguration() {

    }

    confirmCloudConfiguration() {


        SettingsActions.setHubHost(this.state.hubHost);

        SettingsActions.connectToHub();

        this.setState({
            view: CLOUD_CONFIGURATION_PANE
        });

        this.props.navigator.pop();
    }

    render() {

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
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Retro</Text>
                        <Text style={styles.modalText}>Please connect to wifi network.</Text>
                        <Text style={styles.modalButton} onPress={this.cancel.bind(this)}>Cancel</Text>
                    </View>
                </Modal>
                <Modal animate={true} visible={this.state.view == SEARCH_HUB_PANE}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Retro</Text>
                        <Text style={styles.modalText}>Searching for Retro hub in your network...</Text>
                    </View>
                </Modal>
                <Modal animate={true} visible={this.state.view  == HUB_NOT_FOUND_PANE}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Retro</Text>
                        <Text style={styles.modalText}>Could not find Retro Hub in your network.</Text>
                        <Text style={styles.modalButton} onPress={this.searchHub.bind(this)}>Retry</Text>
                        <Text style={styles.modalButton} onPress={this.searchHubManually.bind(this)}>Manual setup</Text>
                        <Text style={styles.modalButton} onPress={this.cancel.bind(this)}>Cancel</Text>
                    </View>
                </Modal>
                <Modal animate={true} visible={this.state.view  == HUB_CONFIGURATION_PANE}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Retro</Text>
                        <Text style={styles.modalText}>Retro Hub has been found in your network.</Text>
                        <View style={styles.modalItemView}>
                            <Text style={styles.modalItemText}>Domain: </Text>
                            <Text style={[styles.modalItemText, {'fontWeight': '500'}]}>{this.state.hubHost}</Text>
                        </View>
                        <Text style={styles.modalButton}
                              onPress={this.confirmHubConfiguration.bind(this)}>Next</Text>
                    </View>
                </Modal>
                <Modal animate={true} visible={this.state.view  == CLOUD_CONFIGURATION_PANE}>
                    <View style={styles.modalContainer}>
                        <Text onPress={this.confirmCloudConfiguration.bind(this)}>Complete setup</Text>
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