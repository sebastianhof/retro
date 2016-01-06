'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';

import settingsStyles from './styles';
import {connect} from 'react-redux';
import {LocationActions} from '../../actions/locationActions';

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

class SetupLocationsViewComponent extends React.Component {

    componentDidMount() {
        LocationActions.fetchLocations();
    }

    addLocation() {

    }

    render() {

        let rightNavigationBarIcon = (
            <Icon name="plus" size={24} color='#ffffff' style={styles.rightNavigationBarIcon} onPress={() => {
                this.addLocation.bind(this)
            }}/>
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


            </View>
        )

    }

}

export const SetupLocationsView = connect(function mapStateToProps(state) {
    return {
        settings: state.settings,
        ui: state.ui
    }
})(SetupLocationsViewComponent);