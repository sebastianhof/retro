'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';

import {connect} from 'react-redux';
import {LeftNavigationBarIcon} from './navigation.ios';
import {HubConnectionStatus} from '../models/settingsModel';
import {NotificationView} from './notification.ios';

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
    }
});

class DashboardViewComponent extends React.Component {

    state = {
        showNotificationPane: false
    };

    componentWillReceiveProps(nextProps) {
        this.update(nextProps);
    }

    componentWillMount() {
        this.update(this.props);
    }

    update(props) {

        let showNotificationPane = false;
        switch (props.settings['hubConnectionStatus']) {
            case HubConnectionStatus.CONNECTING:
            case HubConnectionStatus.NOT_CONNECTED:
            case HubConnectionStatus.NOT_FOUND:
                showNotificationPane = true;
        }

        this.setState({
            showNotificationPane: showNotificationPane
        });

    }

    render() {

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Dashboard', tintColor: '#ffffff' }}
                    leftButton={LeftNavigationBarIcon}
                />
                <Modal animate={true} visible={this.state.showNotificationPane}>
                    <NotificationView navigator={this.props.navigator}
                                      onClose={() => this.setState({showNotificationPane: false})}/>
                </Modal>
                <Text>Dashboard</Text>
            </View>
        );
    }

}

export const DashboardView = connect(function mapStateToProps(state) {
    return {
        items: state.items,
        locations: state.locations,
        settings: state.settings
    }
})(DashboardViewComponent);