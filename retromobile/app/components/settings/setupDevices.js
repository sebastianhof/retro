'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import _ from 'lodash';

import { Form, InputField, Separator, PickerField, SwitchField } from 'react-native-form-generator';

import {connect} from 'react-redux';
import settingsStyles from './styles';

import {ItemActions} from '../../actions/itemActions';
import {DeviceActions} from '../../actions/deviceActions';

const MAXCUBE = 0, PHILIPS_HUE_BRIDGE = 1, NETATMO_WEATHERSTATION = 2, NETATMO_WELCOME = 3, BELKIN_WEMO = 4, WITHINGS = 5;
var {
    StyleSheet,
    Text,
    View,
    Modal,
    ListView,
    TouchableOpacity
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    rightNavigationBarIcon: {
        marginRight: 16
    },
    actionButton: {
        marginTop: 32,
        marginLeft: 32,
        marginRight: 32,
        color: '#ffffff',
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontWeight: '300',
        backgroundColor: '#6d5cae',
        textAlign: 'center',
        paddingTop: 8,
        paddingBottom: 8
    }
});


class SetupDevicesViewComponent extends React.Component {

    addDevice() {

        this.props.navigator.push({
            component: AddDeviceView,
            title: 'Add device'
        });

    }

    showDeviceConfiguration(device) {

        this.props.navigator.push({
            component: ShowDeviceConfigurationView,
            title: device.title,
            device: device
        });

    }

    removeDevice(deviceId) {
        DeviceActions.removeDevice(deviceId);
    }

    render() {

        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows(this.props.devices);

        let rightNavigationBarIcon = (
            <Icon name="plus" size={24} color='#ffffff' style={styles.rightNavigationBarIcon}
                  onPress={this.addDevice.bind(this)}/>
        );

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Setup devices', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                    rightButton={rightNavigationBarIcon}
                />
                <Modal animate={true} visible={this.props.ui.isFetching}>
                    <View style={settingsStyles.modalContainer}>
                        <Text style={settingsStyles.modalTitle}>Retro</Text>
                        <Text style={settingsStyles.modalText}>Searching for devices...</Text>
                    </View>
                </Modal>
                <ListView
                    dataSource={dataSource}
                    renderRow={(device) => {
                        return (
                            <Swipeout backgroundColor="#F5FCFF" autoClose right={[{text: 'Delete', backgroundColor: '#f55753', onPress: this.removeDevice.bind(this, device.id)}]}>
                                <TouchableOpacity onPress={this.showDeviceConfiguration.bind(this, device)}>
                                <View style={settingsStyles.settingsItemView}>
                                    <Text style={settingsStyles.settingsItemText}>{device.title}</Text>
                                </View>
                                </TouchableOpacity>
                            </Swipeout>)
                    }}/>
            </View>
        )

    }

}

export const SetupDevicesView = connect(function mapStateToProps(state) {
    return {
        devices: state.devices,
        settings: state.settings,
        ui: state.ui
    }
})(SetupDevicesViewComponent);

class AddDeviceViewComponent extends React.Component {

    configureDevice(device) {

    }

    render() {

        let devices = [
            {title: 'Philips Hue Bridge', type: PHILIPS_HUE_BRIDGE},
            {title: 'Max!Cube', type: MAXCUBE},
            {title: 'Netatmo Weatherstation', type: NETATMO_WEATHERSTATION},
            {title: 'Netatmo Welcome', type: NETATMO_WELCOME},
            {title: 'Belkin Wemo', type: BELKIN_WEMO},
            {title: 'Withings', type: WITHINGS}
        ];

        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows(_.filter(devices, (device) => _.findIndex(this.props.devices, {type: device.type}) == -1));

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Add device', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <ListView dataSource={dataSource}
                          renderRow={(device) => {

                return (

                    <TouchableOpacity onPress={this.configureDevice.bind(this, device)}>
                        <View style={settingsStyles.settingsItemView}>
                            <Text style={settingsStyles.settingsItemText}>{device.title}</Text>
                        </View>
                    </TouchableOpacity>

                );

                }}/>
            </View>
        );
    }

}

const AddDeviceView = connect(function mapStateToProps(state) {
    return {
        devices: state.devices,
        settings: state.settings,
        ui: state.ui
    }
})(AddDeviceViewComponent);

class ShowDeviceConfigurationViewComponent extends React.Component {

    state = {
        device: null
    };

    constructor(props) {
        super(props);
        this.state.device = this.props.navigator._navigationContext._currentRoute.device;
    }

    updateItem(item) {

        this.props.navigator.push({
            component: UpdateItemView,
            title: `Update ${item.title}`,
            item: item
        });

    }

    render() {
        let device = this.state.device;
        let items = _.filter(this.props.items, {deviceId: device.id});
        let itemsDataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows(items);

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: device.title, tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <Modal animate={true} visible={this.props.ui.isFetching}>
                    <View style={settingsStyles.modalContainer}>
                        <Text style={settingsStyles.modalTitle}>Retro</Text>
                        <Text style={settingsStyles.modalText}>Searching for items...</Text>
                    </View>
                </Modal>
                <Text style={settingsStyles.settingsSectionHeader}>Items</Text>
                <ListView dataSource={itemsDataSource}
                          renderRow={(item) => {

                          return (

                                <TouchableOpacity onPress={this.updateItem.bind(this, item)}>
                                <View style={settingsStyles.settingsItemView}>
                                    <Text style={settingsStyles.settingsItemText}>{item.title}</Text>
                                </View>
                                </TouchableOpacity>

                          );

                          }}/>
            </View>
        );
    }


}

const ShowDeviceConfigurationView = connect(function mapStateToProps(state) {
    return {
        items: state.items,
        settings: state.settings,
        ui: state.ui
    }
})(ShowDeviceConfigurationViewComponent);

class UpdateItemViewComponent extends React.Component {

    state = {
        item: null
    };

    constructor(props) {
        super(props);
        this.state.item = this.props.navigator._navigationContext._currentRoute.item;
    }

    updateLocation() {

        if (this.state != null && this.state.formData != null && this.state.formData.title != null && this.state.formData.locationId != null && this.state.formData.isFavorite != null) {

            let item = this.state.item;
            item.title = this.state.formData.title;
            item.locationId = this.state.formData.locationId;
            item.isFavorite = this.state.formData.isFavorite;

            ItemActions.updateItem(item);
            this.props.navigator.pop();
        } else {
            // invalid form. TODO: show message
        }

    }

    handleFormChange(formData) {
        this.setState({formData: formData});
    }

    render() {

        let item = this.state.item;

        let locations = _.zipObject(_.pluck(this.props.locations, 'id'), _.pluck(this.props.locations, 'title'));

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: `Update ${item.title}`, tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <Form onChange={this.handleFormChange.bind(this)} label="Item">
                    <InputField ref='title' label='Title' placeholder='Type in a title' value={item.title}/>
                    <PickerField ref='locationId' placeholder='Location' value={item.locationId}
                                 options={locations}/>
                    <SwitchField label='Set as favorite item' ref="isFavorite"/>
                </Form>
                <Text style={styles.actionButton} onPress={this.updateLocation.bind(this)}>Update location</Text>
            </View>
        );
    }


}

const UpdateItemView = connect(function mapStateToProps(state) {
    return {
        locations: state.locations,
        settings: state.settings,
        ui: state.ui
    }
})(UpdateItemViewComponent);
