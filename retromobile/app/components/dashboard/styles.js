'use strict';
import React from  'react-native';

var {
    StyleSheet
    } = React;

const dashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    dashboardItemView: {
        flexDirection: 'row',
        paddingTop: 24,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'space-between'
    },
    dashboardItemText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300'
    },
    dashboardItemButton: {}
});

export default dashboardStyles;