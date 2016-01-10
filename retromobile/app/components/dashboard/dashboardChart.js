'use strict';
import React from  'react-native';

import itemStyles from '../items/styles';
import {DashboardChartType} from '../../models/dashboardModel';


var {
    StyleSheet,
    Text,
    View,
    } = React;

var styles = StyleSheet.create({

});

export class DashboardChartView extends React.Component {

    render() {

        let chart = this.props.chart;

        switch (chart.type) {
            case DashboardChartType.LINE_CHART:
                return (<DashboardLineChartView chart={chart} />);
        }

    }

}

export class DashboardLineChartView extends React.Component {

    render() {

        return (<View style={[itemStyles.container, { backgroundColor: '#6d5cae'}]}>
                <Text style={[itemStyles.itemTitle]}>{this.props.chart.title}</Text>
            </View>
        );

    }

}