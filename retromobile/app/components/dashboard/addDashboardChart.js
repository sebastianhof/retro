'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import dashboardStyles from './styles';
import {DashboardActions} from '../../actions/dashboardActions';
import {ItemType} from '../../models/itemModel';
import {DashboardChartType} from '../../models/dashboardModel';

var {
    Text,
    View,
    ListView,
    TouchableOpacity
    } = React;

class AddChartViewComponent extends React.Component {

    state = {
        chartItems: []
    };

    update(props) {

        let chartItems = [];

        _.forEach(props.items, (item) => {

            switch (item.type) {
                case ItemType.THERMOSTAT:
                    chartItems.push({
                        title: `${item.title} temperature chart`,
                        value: 'currTemp',
                        type: DashboardChartType.LINE_CHART,
                        itemId: item.id
                    });
                    break;
                case ItemType.BODY_WEIGHT:
                    chartItems.push({
                        title: `${item.title} weight chart`,
                        value: 'weight',
                        type: DashboardChartType.LINE_CHART,
                        itemId: item.id
                    });
                    break;
            }

        });

        this.setState({
            chartItems: chartItems
        })

    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps);
    }

    componentWillMount() {
        this.update(this.props);
    }

    addChart(chartItem) {
        DashboardActions.addChart(chartItem);
        this.props.navigator.popToTop();
    }

    render() {

        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows(this.state.chartItems);

        return (

            <View style={dashboardStyles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Add a chart', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <ListView
                    dataSource={dataSource}
                    renderRow={(chartItem) => {

                        var icon = <Icon name="area-chart" size={24} color='#6d5cae'
                                          style={dashboardStyles.dashboardItemButton}/>;
                    return (

                            <View>
                                <TouchableOpacity style={dashboardStyles.dashboardItemView}
                                                  onPress={this.addChart.bind(this, chartItem)}>
                                    <Text style={dashboardStyles.dashboardItemText}>{chartItem.title}</Text>
                                    {icon}
                                </TouchableOpacity>
                            </View>

                        );

                    }}
                />
            </View>

        )

    }

}

export const AddChartView = connect(function mapStateToProps(state) {
    return {
        items: state.items,
        dashboard: state.dashboard
    }
})(AddChartViewComponent);