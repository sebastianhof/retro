'use strict';
import React from  'react-native';
import itemStyles from '../items/styles';

var {
    StyleSheet,
    Text,
    View,
    } = React;

var styles = StyleSheet.create({
    dashboardCommandButton: {
        alignSelf: 'flex-start',
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontWeight: '300',
        color: '#ffffff',
        borderColor: '#ffffff',
        marginTop: 32,
        marginBottom: 32,
        marginLeft: 32,
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8
    }
});

export class DashboardCommandView extends React.Component {

    render() {

        return (<View style={[itemStyles.container, { backgroundColor: '#6d5cae'}]}>
                <Text style={[itemStyles.itemTitle]}>{this.props.command.title} command</Text>
                <Text style={styles.dashboardCommandButton}>Execute</Text>
            </View>
        )

    }

}