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
        paddingTop: 24,
        paddingLeft: 16
    },
    settingsItemView: {
        flexDirection: 'row',
        paddingTop: 24,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'space-between'
    },
    settingsItemText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300'
    },
    settingsItemTextInput: {
        height: 40,
        marginTop: 8,
        marginLeft: 16,
        marginRight: 16,
        borderColor: '#6d5cae',
        borderWidth: 1,
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300'
    },
    settingsItemSwitch: {
        alignSelf: 'flex-end'
    },
    settingsConfirmButton: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        marginTop: 32,
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        alignSelf: 'center'
    },
    settingsButton: {},
    modalContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center'
    },
    modalTitle: {
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 32,
        alignSelf: 'center'
    },
    modalText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        alignSelf: 'center'
    },
    modalButton: {
        alignSelf: 'center',
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        marginTop: 32,
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8
    },
    modalItemView: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    modalItemText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300'
    }
});

export default settingsStyles;