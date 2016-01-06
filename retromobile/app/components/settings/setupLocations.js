'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';

var {
    StyleSheet,
    Text,
    View
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
});

export class SetupLocationsView extends React.Component {

    render() {

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
                />
                <Text>Setup Locations</Text>
            </View>
        )

    }

}