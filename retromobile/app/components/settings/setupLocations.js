'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';

import { Form, InputField, Separator, PickerField } from 'react-native-form-generator';

import settingsStyles from './styles';
import {connect} from 'react-redux';

import {LocationActions} from '../../actions/locationActions';

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

class SetupLocationsViewComponent extends React.Component {

    addLocation() {

        this.props.navigator.push({
            component: AddLocationView,
            title: 'Add location'
        });

    }

    updateLocation(location) {

        this.props.navigator.push({
            component: UpdateLocationView,
            title: `Update ${location.title}`,
            location: location
        });

    }

    removeLocation(locationId) {
        LocationActions.removeLocation(locationId);
    }

    render() {

        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows(this.props.locations);

        let rightNavigationBarIcon = (
            <Icon name="plus" size={24} color='#ffffff' style={styles.rightNavigationBarIcon}
                  onPress={this.addLocation.bind(this)}/>
        );

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Setup locations', tintColor: '#ffffff' }}
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
                        <Text style={settingsStyles.modalText}>Searching for locations...</Text>
                    </View>
                </Modal>
                <ListView
                    dataSource={dataSource}
                    renderRow={(location) => {
                        return (
                            <Swipeout backgroundColor="#F5FCFF" autoClose right={[{text: 'Delete', backgroundColor: '#f55753', onPress: this.removeLocation.bind(this, location.id)}]}>
                                <TouchableOpacity onPress={this.updateLocation.bind(this, location)}>
                                    <View style={settingsStyles.settingsItemView}>
                                        <Text style={settingsStyles.settingsItemText}>{location.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            </Swipeout>)
                    }}/>

            </View>
        )

    }

}

export const SetupLocationsView = connect(function mapStateToProps(state) {
    return {
        locations: state.locations,
        settings: state.settings,
        ui: state.ui
    }
})(SetupLocationsViewComponent);

class AddLocationView extends React.Component {

    addLocation() {

        if (this.state != null && this.state.formData != null && this.state.formData.title != null && this.state.formData.type != null) {
            LocationActions.addLocation({
                type: this.state.formData.type,
                title: this.state.formData.title
            });
            this.props.navigator.pop();
        } else {
            // invalid form. TODO: show message

        }

    }

    handleFormChange(formData) {
        this.setState({formData: formData});
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Add location', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <Form onChange={this.handleFormChange.bind(this)} label="Location">
                    <InputField ref='title' label='Title' placeholder='Type in a title'/>
                    <PickerField ref='type' placeholder='Type'
                                 options={{
                            0: 'Living room',
                            1: 'Bedroom',
                            2: 'Kitchen',
                            3: 'Outside',
                            4: 'Bathroom',
                            5: 'Hall',
                            6: 'Toilet',
                            7: 'Other'
                      }}/>
                </Form>
                <Text style={styles.actionButton} onPress={this.addLocation.bind(this)}>Add location</Text>
            </View>
        );
    }

}

class UpdateLocationView extends React.Component {

    state = {
        location: null
    };

    constructor(props) {
        super(props);

        this.state.location = this.props.navigator._navigationContext._currentRoute.location;
    }

    updateLocation() {

        if (this.state != null && this.state.formData != null && this.state.formData.title != null && this.state.formData.type != null) {

            let location = this.state.location;
            location.type = this.state.formData.type;
            location.title = this.state.formData.title;

            LocationActions.updateLocation(location);
            this.props.navigator.pop();
        } else {
            // invalid form. TODO: show message
        }

    }

    handleFormChange(formData) {
        this.setState({formData: formData});
    }


    render() {

        let location = this.state.location;

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: `Update ${location.title}`, tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <Form onChange={this.handleFormChange.bind(this)} label="Location">
                    <InputField ref='title' label='Title' placeholder='Type in a title' value={location.title }/>
                    <PickerField ref='type' placeholder='Type' value={location.type}
                                 options={{
                            0: 'Living room',
                            1: 'Bedroom',
                            2: 'Kitchen',
                            3: 'Outside',
                            4: 'Bathroom',
                            5: 'Hall',
                            6: 'Toilet',
                            7: 'Other'
                      }}/>
                </Form>
                <Text style={styles.actionButton} onPress={this.updateLocation.bind(this)}>Update location</Text>
            </View>
        );
    }


}