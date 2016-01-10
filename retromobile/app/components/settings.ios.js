'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';

import {HubConnectionStatus} from '../models/settingsModel';
import {connect} from 'react-redux';
import {LeftNavigationBarIcon} from './navigation.ios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SetupConnectionView} from './settings/setupConnection';
import {SetupDevicesView} from './settings/setupDevices';
import {SetupLocationsView} from './settings/setupLocations';
import {SetupRulesView} from './settings/setupRules';
import {AboutView, ContactView, FeedbackView} from './settings/about';
import {SettingsActions} from '../actions/settingsActions';
import settingsStyles from './settings/styles';

var {
    StyleSheet,
    Text,
    ListView,
    View,
    TouchableOpacity,
    Switch
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
});

const SETTINGS_HUB = 1;
const SETTINGS_HUB_STATUS = 10;
const SETTINGS_HUB_ADDRESS = 11;
const SETTINGS_RETRO_HUB_SETUP = 12;

const SETTINGS_CLOUD = 7;
const SETTINGS_USE_CLOUD = 70;

const SETTINGS_SETUP = 8;

const SETTINGS_DEVICES = 2;
const SETTINGS_DEVICES_SETUP = 20;

const SETTINGS_LOCATIONS = 3;
const SETTINGS_LOCATIONS_SETUP = 30;

const SETTINGS_RULES = 4;
const SETTINGS_RULES_SETUP = 40;

const SETTINGS_ABOUT = 6;
const SETTINGS_ABOUT_RETRO = 60;
const SETTINGS_ABOUT_CONTACT = 61;
const SETTINGS_ABOUT_FEEDBACK = 62;

class SettingsViewComponent extends React.Component {

    state = {
        dataSource: new ListView.DataSource({
            getSectionData: (dataBlob, sectionID) => {
                return dataBlob[sectionID];
            },
            getRowData: (dataBlob, sectionID, rowID) => {
                return dataBlob[sectionID][rowID];
            },
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        }).cloneWithRowsAndSections({
            [SETTINGS_HUB]: [
                SETTINGS_HUB_STATUS,
                SETTINGS_HUB_ADDRESS
            ],
            [SETTINGS_CLOUD]: [
                SETTINGS_USE_CLOUD
            ],
            [SETTINGS_SETUP]: [
                SETTINGS_RETRO_HUB_SETUP,
                SETTINGS_DEVICES_SETUP,
                SETTINGS_LOCATIONS_SETUP,
                SETTINGS_RULES_SETUP
            ],
            [SETTINGS_ABOUT]: [
                SETTINGS_ABOUT_RETRO,
                SETTINGS_ABOUT_CONTACT,
                SETTINGS_ABOUT_FEEDBACK
            ]
        }, [SETTINGS_HUB, SETTINGS_SETUP, SETTINGS_ABOUT]) // Use cloud SETTINGS_CLOUD,
    };

    setupConnection() {

        this.props.navigator.push({
            component: SetupConnectionView,
            title: 'Setup connection'
        });
    }

    setupDevices() {
        this.props.navigator.push({
            component: SetupDevicesView,
            title: 'Setup devices'
        });
    }

    setupLocations() {
        this.props.navigator.push({
            component: SetupLocationsView,
            title: 'Setup locations'
        });
    }

    setupRules() {
        this.props.navigator.push({
            component: SetupRulesView,
            title: 'Setup rules'
        });
    }

    openAbout() {
        this.props.navigator.push({
            component: AboutView,
            title: 'About retro'
        });
    }

    openContact() {
        this.props.navigator.push({
            component: ContactView,
            title: 'Contact us'
        });
    }

    openFeedback() {
        this.props.navigator.push({
            component: FeedbackView,
            title: 'Send us feedback'
        });
    }

    toggleUseCloud(value) {
        SettingsActions.setUseCloud(value);
    }

    render() {

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Settings', tintColor: '#ffffff' }}
                    leftButton={LeftNavigationBarIcon}
                />
                <ListView
                    dataSource={this.state.dataSource}

                    renderSectionHeader={(sectionData, sectionID) => {

                        switch (sectionID) {
                            case SETTINGS_HUB:
                                return (<Text style={settingsStyles.settingsSectionHeader}>Retro hub</Text>);
                            case SETTINGS_CLOUD:
                                return (<Text style={settingsStyles.settingsSectionHeader}>Retro cloud</Text>);
                            case SETTINGS_SETUP:
                                return (<Text style={settingsStyles.settingsSectionHeader}>Setup</Text>);
                            case SETTINGS_DEVICES:
                                return (<Text style={settingsStyles.settingsSectionHeader}>Devices</Text>);
                            case SETTINGS_LOCATIONS:
                                return (<Text style={settingsStyles.settingsSectionHeader}>Locations</Text>);
                            case SETTINGS_RULES:
                                return (<Text style={settingsStyles.settingsSectionHeader}>Rules</Text>);
                            case SETTINGS_ABOUT:
                                return (<Text style={settingsStyles.settingsSectionHeader}>About</Text>);
                        }

                    }}

                    renderRow={(rowData) => {

                        switch (rowData) {
                            case SETTINGS_HUB_STATUS:
                                // Hub Status
                                let status;
                                switch (this.props.settings.hubConnectionStatus) {

                                    case HubConnectionStatus.NOT_CONNECTED:
                                        status =  <Text style={[settingsStyles.settingsItemText, { fontWeight: '500' }]}>Not connected</Text>;
                                        break;
                                    case HubConnectionStatus.CONNECTING:
                                        status =  <Text style={[settingsStyles.settingsItemText, { fontWeight: '500' }]}>Connecting</Text>;
                                        break;
                                    case HubConnectionStatus.CONNECTED:
                                        status =  <Text style={[settingsStyles.settingsItemText, { fontWeight: '500' }]}>Connnected</Text>;
                                        break;
                                    case HubConnectionStatus.CONNECTED_TO_CLOUD:
                                        status =  <Text style={[settingsStyles.settingsItemText, { fontWeight: '500' }]}>Connnected via cloud</Text>;
                                        break;
                                    case HubConnectionStatus.NOT_FOUND:
                                        status =  <Text style={[settingsStyles.settingsItemText, { fontWeight: '500' }]}>Not found</Text>;
                                        break;

                                }

                                return (<View style={settingsStyles.settingsItemView}>
                                    <Text style={settingsStyles.settingsItemText}>Connection status</Text>
                                    {status}
                                </View>);

                            case SETTINGS_HUB_ADDRESS:

                                return (<View style={settingsStyles.settingsItemView}>
                                            <Text style={settingsStyles.settingsItemText}>Hub Address</Text>
                                            <Text style={settingsStyles.settingsItemText}>{this.props.settings.hubHost}</Text>
                                        </View>);

                            case SETTINGS_USE_CLOUD:

                                return (<View style={settingsStyles.settingsItemView}>
                                        <Text style={settingsStyles.settingsItemText}>Use Retro Cloud</Text>
                                        <Switch tintColor="#6d5cae" onTintColor="#6d5cae" style={settingsStyles.settingsItemSwitch}
                                                onValueChange={this.toggleUseCloud.bind(this)}
                                                value={this.props.settings.useCloud}/>
                                    </View>);

                            case SETTINGS_RETRO_HUB_SETUP:
                                return (<TouchableOpacity onPress={this.setupConnection.bind(this)}>
                                <View style={settingsStyles.settingsItemView}>
                                    <Text style={settingsStyles.settingsItemText}>Setup connection</Text>
                                     <Icon name="angle-right" size={24} color='#6d5cae'
                                        style={settingsStyles.settingsButton}/>
                                </View>
                                </TouchableOpacity>);
                            case SETTINGS_DEVICES_SETUP:
                                return (<TouchableOpacity onPress={this.setupDevices.bind(this)}>
                                <View style={settingsStyles.settingsItemView}>
                                    <Text style={settingsStyles.settingsItemText}>Setup devices</Text>
                                     <Icon name="angle-right" size={24} color='#6d5cae'
                                        style={settingsStyles.settingsButton}/>
                                </View>
                                </TouchableOpacity>);
                            case SETTINGS_LOCATIONS_SETUP:
                                return (<TouchableOpacity onPress={this.setupLocations.bind(this)}>
                                <View style={settingsStyles.settingsItemView}>
                                    <Text style={settingsStyles.settingsItemText}>Setup locations</Text>
                                     <Icon name="angle-right" size={24} color='#6d5cae'
                                        style={settingsStyles.settingsButton}/>
                                </View>
                                </TouchableOpacity>);
                            case SETTINGS_RULES_SETUP:
                                return (<TouchableOpacity onPress={this.setupRules.bind(this)}>
                                <View style={settingsStyles.settingsItemView}>
                                    <Text style={settingsStyles.settingsItemText}>Setup rules</Text>
                                     <Icon name="angle-right" size={24} color='#6d5cae'
                                        style={settingsStyles.settingsButton}/>
                                </View>
                                </TouchableOpacity>);
                            case SETTINGS_ABOUT_RETRO:
                            return (<TouchableOpacity onPress={this.openAbout.bind(this)}>
                            <View style={settingsStyles.settingsItemView}>
                                        <Text style={settingsStyles.settingsItemText}>About retro</Text>
                                     <Icon name="angle-right" size={24} color='#6d5cae'
                                        style={settingsStyles.settingsButton}/>
                                </View>
                                </TouchableOpacity>);
                            case SETTINGS_ABOUT_CONTACT:
                                return (<TouchableOpacity onPress={this.openContact.bind(this)}>
                                <View style={settingsStyles.settingsItemView}>
                                    <Text style={settingsStyles.settingsItemText}>Contact us</Text>
                                     <Icon name="angle-right" size={24} color='#6d5cae'
                                        style={settingsStyles.settingsButton}/>
                                </View>
                                </TouchableOpacity>);
                            case SETTINGS_ABOUT_FEEDBACK:
                                return (<TouchableOpacity onPress={this.openFeedback.bind(this)}>
                                <View style={settingsStyles.settingsItemView}>
                                    <Text style={settingsStyles.settingsItemText}>Send us feedback</Text>
                                     <Icon name="angle-right" size={24} color='#6d5cae'
                                        style={settingsStyles.settingsButton}/>
                                </View>
                                </TouchableOpacity>);
                        }

                        return (<Text>0</Text>);
                    }}
                />

            </View>
        );
    }
}

export const SettingsView = connect(function mapStateToProps(state) {
    return {
        settings: state.settings
    }
})(SettingsViewComponent);