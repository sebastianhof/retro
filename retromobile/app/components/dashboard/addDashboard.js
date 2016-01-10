'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import dashboardStyles from './styles';
import {AddItemView} from './addDashboardItem';
import {AddChartView} from './addDashboardChart';
import {AddCommandView} from './addDashboardCommand';

var {
    Text,
    View,
    ListView,
    TouchableOpacity
    } = React;

const ADD_ITEM = 'ADD_ITEM';
const ADD_COMMAND = 'ADD_COMMAND';
const ADD_CHART = 'ADD_CHART';

export class AddDashboardItemView extends React.Component {

    addItem() {

        this.props.navigator.push({
            component: AddItemView,
            title: 'Add an item'
        });

    }

    addCommand() {

        this.props.navigator.push({
            component: AddCommandView,
            title: 'Add a command'
        })

    }

    addChart() {

        this.props.navigator.push({
            component: AddChartView,
            title: 'Add a chart'
        });

    }

    render() {

        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows([ADD_ITEM, ADD_COMMAND, ADD_CHART]);

        return (
            <View style={dashboardStyles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Add dashboard item', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <ListView
                    dataSource={dataSource}
                    renderRow={(row) => {

                        switch (row) {
                            case ADD_ITEM:

                                return (

                                    <View>
                                        <TouchableOpacity style={dashboardStyles.dashboardItemView}
                                                          onPress={this.addItem.bind(this)}>
                                            <Text style={dashboardStyles.dashboardItemText}>Add item</Text>
                                            <Icon name="list-ul" size={24} color='#6d5cae'
                                                  style={dashboardStyles.dashboardItemButton}/>
                                        </TouchableOpacity>
                                    </View>

                                );

                            case ADD_COMMAND:

                                return (

                                    <View>
                                        <TouchableOpacity style={dashboardStyles.dashboardItemView}
                                                          onPress={this.addCommand.bind(this)}>
                                            <Text style={dashboardStyles.dashboardItemText}>Add a command</Text>
                                            <Icon name="terminal" size={24} color='#6d5cae'
                                                  style={dashboardStyles.dashboardItemButton}/>
                                        </TouchableOpacity>
                                    </View>

                                );

                            case ADD_CHART:

                                return (

                                    <View>
                                        <TouchableOpacity style={dashboardStyles.dashboardItemView}
                                                          onPress={this.addChart.bind(this)}>
                                            <Text style={dashboardStyles.dashboardItemText}>Add a chart</Text>
                                            <Icon name="area-chart" size={24} color='#6d5cae'
                                                  style={dashboardStyles.dashboardItemButton}/>
                                        </TouchableOpacity>
                                    </View>

                                );

                        }
                    }}/>
            </View>
        )

    }

}