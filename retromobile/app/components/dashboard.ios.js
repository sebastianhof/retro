'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
var _ = require('lodash');

import {LeftNavigationBarIcon} from './navigation.ios';
import {HubConnectionStatus} from '../models/settingsModel';
import {NotificationView} from './notification.ios';
import {DashboardType} from '../models/dashboardModel';

import {AddDashboardItemView} from './dashboard/addDashboard';
import {DashboardItemView} from './dashboard/dashboardItem';
import {DashboardCommandView} from './dashboard/dashboardCommand';
import {DashboardChartView} from './dashboard/dashboardChart';

var {
    StyleSheet,
    View,
    Modal,
    ListView,
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

    addDashboardItem() {

        this.props.navigator.push({
            component: AddDashboardItemView,
            title: 'Add dashboard item'
        });

    }

    render() {

        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows(this.props.dashboard);

        let rightNavigationBarIcon = (
            <Icon name="plus" size={24} color='#ffffff' style={styles.rightNavigationBarIcon}
                  onPress={this.addDashboardItem.bind(this)}/>
        );

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Dashboard', tintColor: '#ffffff' }}
                    leftButton={LeftNavigationBarIcon}
                    rightButton={rightNavigationBarIcon}
                />
                <Modal animate={true} visible={this.state.showNotificationPane}>
                    <NotificationView navigator={this.props.navigator}
                                      onClose={() => this.setState({showNotificationPane: false})}/>
                </Modal>
                <ListView
                    dataSource={dataSource}
                    renderRow={(dashboardItem) => {

                        switch (dashboardItem.type) {

                            case DashboardType.ITEM:
                                return (<DashboardItemView itemId={dashboardItem.itemId} />);
                            case DashboardType.COMMAND:
                                return (<DashboardCommandView command={dashboardItem.command} />);
                            case DashboardType.CHART:
                                return (<DashboardChartView chart={dashboardItem.chart} />);

                        }

                    }}/>
            </View>
        );
    }

}

import {connect} from 'react-redux';
export const DashboardView = connect(function mapStateToProps(state) {
    return {
        items: state.items,
        locations: state.locations,
        settings: state.settings,
        dashboard: state.dashboard
    }
})(DashboardViewComponent);





