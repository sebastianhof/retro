'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';

import {connect} from 'react-redux';
import {LeftNavigationBarIcon} from './navigation.ios';
import Icon from 'react-native-vector-icons/FontAwesome';

var {
    StyleSheet,
    Text,
    View,
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    helpItemView: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'space-between',
    },
    helpItemText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300'
    },
    helpItemButton: {},
    helpSectionHeader: {
        alignSelf: 'flex-start',
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '500',
        paddingTop: 16,
        paddingLeft: 16
    },
});

export class HelpView extends React.Component {

    showWalkthrough() {

    }

    playVideo() {

    }

    openFAQ() {

    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Help', tintColor: '#ffffff' }}
                    leftButton={LeftNavigationBarIcon}
                />
                <View style={styles.helpItemView} onPress={() => { this.playVideo.bind(this) }}>
                    <Text style={styles.helpItemText}>Retro Help</Text>
                    <Icon name="angle-right" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <View style={styles.helpItemView} onPress={() => { this.showWalkthrough.bind(this) }}>
                    <Text style={styles.helpItemText}>Show walkthrough</Text>
                    <Icon name="angle-right" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <View style={styles.helpItemView} onPress={() => { this.playVideo.bind(this) }}>
                    <Text style={styles.helpItemText}>Play video</Text>
                    <Icon name="angle-right" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <Text style={styles.helpSectionHeader}>FAQs</Text>
                <View style={styles.helpItemView} onPress={() => { this.openFAQ.bind(this) }}>
                    <Text style={styles.helpItemText}>What is Retro?</Text>
                    <Icon name="angle-down" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <View style={styles.helpItemView} onPress={() => { this.openFAQ.bind(this) }}>
                    <Text style={styles.helpItemText}>What things do I need for Retro?</Text>
                    <Icon name="angle-down" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <View style={styles.helpItemView} onPress={() => { this.openFAQ.bind(this) }}>
                    <Text style={styles.helpItemText}>How do I setup Retro?</Text>
                    <Icon name="angle-down" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <View style={styles.helpItemView} onPress={() => { this.openFAQ.bind(this) }}>
                    <Text style={styles.helpItemText}>How do I connect devices to Retro?</Text>
                    <Icon name="angle-down" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <View style={styles.helpItemView} onPress={() => { this.openFAQ.bind(this) }}>
                    <Text style={styles.helpItemText}>How do I manage locations?</Text>
                    <Icon name="angle-down" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <View style={styles.helpItemView} onPress={() => { this.openFAQ.bind(this) }}>
                    <Text style={styles.helpItemText}>How do I define rules?</Text>
                    <Icon name="angle-down" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <View style={styles.helpItemView} onPress={() => { this.openFAQ.bind(this) }}>
                    <Text style={styles.helpItemText}>How do I use the dashboard?</Text>
                    <Icon name="angle-down" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <View style={styles.helpItemView} onPress={() => { this.openFAQ.bind(this) }}>
                    <Text style={styles.helpItemText}>How do I control items?</Text>
                    <Icon name="angle-down" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
                <View style={styles.helpItemView} onPress={() => { this.openFAQ.bind(this) }}>
                    <Text style={styles.helpItemText}>What if I need more help?</Text>
                    <Icon name="angle-down" size={24} color='#6d5cae'
                          style={styles.helpItemButton}/>
                </View>
            </View>
        );
    }
}