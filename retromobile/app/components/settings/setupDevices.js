'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';

import {DeviceActions} from '../../actions/deviceActions';
import {connect} from 'react-redux';
import settingsStyles from './styles';

var {
    StyleSheet,
    Text,
    View,
    Modal
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    rightNavigationBarIcon: {
        marginRight: 16
    }
});


class SetupDevicesViewComponent extends React.Component {

    addDevice() {

    }

    render() {

        let rightNavigationBarIcon = (
            <Icon name="plus" size={24} color='#ffffff' style={styles.rightNavigationBarIcon} onPress={() => {
                this.addDevice.bind(this)
            }}/>
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

            </View>
        )

    }

}

export const SetupDevicesView = connect(function mapStateToProps(state) {
    return {
        settings: state.settings,
        ui: state.ui
    }
})(SetupDevicesViewComponent);