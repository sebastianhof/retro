'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export class DashboardView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Dashboard</Text>
            </View>
        );
    }

}