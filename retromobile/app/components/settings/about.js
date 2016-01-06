'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Communications from 'react-native-communications';


var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    LinkingIOS,
    ListView
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    retroTitle: {
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 32,
        paddingBottom: 32,
        alignSelf: 'center'
    },
    retroDescription: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        alignSelf: 'center',
        paddingBottom: 8
    },
    aboutItemView: {
        flexDirection: 'row',
        paddingTop: 24,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'space-between',
    },
    aboutItemText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300'
    },
    aboutItemButton: {}
});

const ABOUT_RETRO = 0;
const LICENSES = 1;
const TERMS_OF_USE = 2;
const PRIVACY_POLICY = 3;

export class AboutView extends React.Component {

    render() {

        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows([ABOUT_RETRO, LICENSES, TERMS_OF_USE, PRIVACY_POLICY]);

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


                <ListView
                    dataSource={dataSource}
                    renderRow={(row) => {

                        switch (row) {

                            case ABOUT_RETRO:

                                return (
                                    <View>
                                        <Text style={styles.retroTitle}>Retro</Text>
                                        <Text style={styles.retroDescription}>Version 0.0.1 (Build 0001)</Text>
                                        <Text style={styles.retroDescription}>Copyright © 2016. Retro</Text>
                                        <Text style={styles.retroDescription}>All rights reserved.</Text>
                                    </View>
                                );

                            case LICENSES:

                                return(
                                    <View style={styles.aboutItemView} onPress={() => {  }}>
                                        <Text style={styles.aboutItemText}>Licenses</Text>
                                        <Icon name="angle-right" size={24} color='#6d5cae'
                                              style={styles.aboutItemButton}/>
                                    </View>
                                );

                            case TERMS_OF_USE:

                                return(
                                    <View style={styles.aboutItemView} onPress={() => {  }}>
                                        <Text style={styles.aboutItemText}>Terms of use</Text>
                                        <Icon name="angle-right" size={24} color='#6d5cae'
                                              style={styles.aboutItemButton}/>
                                    </View>
                                );

                            case PRIVACY_POLICY:

                                return(
                                    <View style={styles.aboutItemView} onPress={() => {  }}>
                                        <Text style={styles.aboutItemText}>Privacy policy</Text>
                                        <Icon name="angle-right" size={24} color='#6d5cae'
                                              style={styles.aboutItemButton}/>
                                    </View>
                                );

                        }
                    }} />




            </View>
        )

    }

}

const SEND_EMAIL = 0;
const FOLLOW_ON_TWITTER = 1;
const LIKE_ON_FACEBOOK = 2;

export class ContactView extends React.Component {

    openTwitter() {
        LinkingIOS.canOpenURL("twitter://", (supported) => {
            if (!supported) {
                LinkingIOS.openURL("https://www.twitter.com/snhof");
            } else {
                LinkingIOS.openURL("https://twitter://user?id=snhof");
            }
        });
    }

    openFacebook() {
        LinkingIOS.canOpenURL("fb://", (supported) => {
            if (!supported) {
                LinkingIOS.openURL("https://www.facebook.com/1656428665");
            } else {
                LinkingIOS.openURL("fb://profile/1656428665");
            }
        });
    }


    render() {

        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows([SEND_EMAIL, FOLLOW_ON_TWITTER, LIKE_ON_FACEBOOK]);

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
                <ListView
                    dataSource={dataSource}
                    renderRow={(row) => {

                        switch (row) {
                            case SEND_EMAIL:

                                return (

                                    <View>
                                        <TouchableOpacity style={styles.aboutItemView}
                                                          onPress={() => Communications.email(['contact@retrohub.com'],null, null, null,null)}>
                                            <Text style={styles.aboutItemText}>Send us an email</Text>
                                            <Icon name="envelope" size={24} color='#6d5cae'
                                                  style={styles.aboutItemButton}/>
                                        </TouchableOpacity>
                                    </View>

                                );

                            case FOLLOW_ON_TWITTER:

                                return (

                                       <View>
                                            <TouchableOpacity style={styles.aboutItemView} onPress={this.openTwitter.bind(this)}>
                                                <Text style={styles.aboutItemText}>Follow us on Twitter</Text>
                                                <Icon name="twitter" size={24} color='#6d5cae'
                                                      style={styles.aboutItemButton}/>
                                            </TouchableOpacity>
                                        </View>

                                );

                            case LIKE_ON_FACEBOOK:

                                return (

                                     <View>
                                        <TouchableOpacity style={styles.aboutItemView} onPress={this.openFacebook.bind(this)}>
                                            <Text style={styles.aboutItemText}>Like us on Facebook</Text>
                                            <Icon name="facebook" size={24} color='#6d5cae'
                                                  style={styles.aboutItemButton}/>
                                        </TouchableOpacity>
                                    </View>

                                );

                        }
                    }} />



            </View>
        )

    }

}

const SEND_FEEDBACK_EMAIL = 0;
const RATE_APP_STORE = 1;

export class FeedbackView extends React.Component {

    render() {

        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        }).cloneWithRows([SEND_FEEDBACK_EMAIL, RATE_APP_STORE]);

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
                <ListView
                    dataSource={dataSource}
                    renderRow={(row) => {

                        switch (row) {
                            case SEND_FEEDBACK_EMAIL:

                                return (
                                    <View>
                                        <TouchableOpacity style={styles.aboutItemView}
                                                          onPress={() => Communications.email(['contact@retrohub.com'],null, null, 'Feedback',null)}>
                                            <Text style={styles.aboutItemText}>Send us an feedback email</Text>
                                            <Icon name="envelope" size={24} color='#6d5cae'
                                                  style={styles.aboutItemButton}/>
                                        </TouchableOpacity>
                                    </View>
                                );

                            case RATE_APP_STORE:

                                return (
                                    <View>
                                        <TouchableOpacity style={styles.aboutItemView} onPress={() => {
                                        LinkingIOS.openURL("itms-apps://itunes.apple.com/app/123456789");
                                      }}>
                                            <Text style={styles.aboutItemText}>Rate us on App Store</Text>
                                            <Icon name="apple" size={24} color='#6d5cae'
                                                  style={styles.aboutItemButton}/>
                                        </TouchableOpacity>
                                    </View>
                                );

                        }

                    }} />

            </View>
        )

    }

}