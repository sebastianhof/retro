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

export class AboutView extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'About retro', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <Text>About Retro</Text>
            </View>
        )

    }

}

export class ContactView extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Contact', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <Text>Contact Retro</Text>
            </View>
        )

    }

}

export class FeedbackView extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: 'Send us feedback', tintColor: '#ffffff' }}
                    leftButton={{
                          title: 'Back',
                          tintColor: '#ffffff',
                          handler: () => this.props.navigator.pop()
                    }}
                />
                <Text>Feedback</Text>
            </View>
        )

    }

}