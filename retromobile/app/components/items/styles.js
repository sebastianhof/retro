'use strict';
import React from  'react-native';

var {
    StyleSheet
    } = React;

const itemStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 5,
        marginBottom: 5
    },
    itemTitle: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        paddingTop: 16,
        paddingLeft: 16,
        color: '#ffffff'
    },
    itemInverse: {
        color: '#626262'
    },
    itemMainValue: {
        fontFamily: 'Open Sans',
        fontSize: 32,
        fontWeight: '500',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 32,
        color: '#ffffff'
    },
    itemValue: {
        fontFamily: 'Open Sans',
        fontSize: 24,
        fontWeight: '300',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        color: '#ffffff'
    },
    itemSlider: {
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 16
    },
    itemSwitch: {
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 16
    },
    itemPropertyValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 16
    },
    itemPropertyKey: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        color: '#ffffff'
    },
    itemPropertyValue: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff'
    }
});

export default itemStyles;