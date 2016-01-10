'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import _ from 'lodash';

import {connect} from 'react-redux';
import dashboardStyles from './styles';
import settingsStyles from '../settings/styles';
import {DashboardActions} from '../../actions/dashboardActions';

var {
    Text,
    View,
    TextInput
    } = React;

class AddCommandViewComponent extends React.Component {

    state = {
        title: ''
    };

    addCommand() {

        DashboardActions.addCommand({
            title: this.state.title,
            actions: []
        });

        this.props.navigator.popToTop();

    }

    render() {

        return (

            <View style={dashboardStyles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Add command', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <Text style={settingsStyles.settingsSectionHeader}>Title</Text>
                <TextInput style={settingsStyles.settingsItemTextInput}
                           value={this.state.title}
                           onChangeText={(text) => this.setState({
                                title: text
                            })}/>
                <Text style={settingsStyles.settingsSectionHeader}>Actions</Text>
                <View style={[settingsStyles.settingsItemView, {justifyContent: 'center'}]}>
                    <Text style={settingsStyles.settingsConfirmButton} onPress={this.addCommand.bind(this)}>Add
                        command</Text>
                </View>
            </View>

        )

    }

}

export const AddCommandView = connect(function mapStateToProps(state) {
    return {
        items: state.items,
        dashboard: state.dashboard
    }
})(AddCommandViewComponent);