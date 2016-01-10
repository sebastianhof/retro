'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';

import _ from 'lodash';

import {connect} from 'react-redux';
import dashboardStyles from './styles';
import {DashboardActions} from '../../actions/dashboardActions';
import {itemTypeToTitle, ItemType} from '../../models/itemModel';


var {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity
    } = React;

var styles = StyleSheet.create({

});

class AddItemViewComponent extends React.Component {

    state = {
        filteredItems: []
    };

    update(props) {

        let filteredItems = _.filter(props.items, (item) => {
            let existingItem = _.find(props.dashboard, {id: item.id});
            return existingItem == null;
        });

        this.setState({
            filteredItems: filteredItems
        })

    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps);
    }

    componentWillMount() {
        this.update(this.props);
    }

    addItem(itemId) {
        DashboardActions.addItem(itemId);
        this.props.navigator.popToTop();
    }

    render() {

        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows(this.state.filteredItems);

        return (

            <View style={dashboardStyles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Add quick item', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <ListView
                    dataSource={dataSource}
                    renderRow={(item) => {

                        var icon = <Icon name="list-ul" size={24} color='#6d5cae'
                                          style={dashboardStyles.dashboardItemButton}/>;

                        return (

                            <View>
                                <TouchableOpacity style={dashboardStyles.dashboardItemView}
                                                  onPress={this.addItem.bind(this, item.id)}>
                                    <Text style={dashboardStyles.dashboardItemText}>{item.title} {itemTypeToTitle(item.type).toLowerCase()}</Text>
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

export const AddItemView = connect(function mapStateToProps(state) {
    return {
        items: state.items,
        dashboard: state.dashboard
    }
})(AddItemViewComponent);
