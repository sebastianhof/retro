'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';

import {connect} from 'react-redux';
import {LeftNavigationBarIcon} from './navigation.ios';

var {
    StyleSheet,
    Text,
    View,
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
});

export class AboutView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'About', tintColor: '#ffffff' }}
                    leftButton={LeftNavigationBarIcon}
                />
                <Text>About</Text>
            </View>
        );
    }
}