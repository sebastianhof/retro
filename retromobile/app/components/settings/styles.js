'use strict';
import React from  'react-native';

var {
    StyleSheet
    } = React;

const settingsStyles = StyleSheet.create({
    settingsSectionHeader: {
        alignSelf: 'flex-start',
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '500',
        paddingTop: 16,
        paddingLeft: 16
    },
    settingsItemView: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'space-between'
    },
    settingsItemText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300'
    },
    settingsItemSwitch: {
        alignSelf: 'flex-end'
    },
    settingsButton: {}
});

export default settingsStyles;