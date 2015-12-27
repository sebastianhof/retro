'use strict';
var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Icon = require('react-native-vector-icons/FontAwesome');
var _ = require('lodash');

import {DashboardView} from './dashboard.ios';
import {ItemsView} from './items.ios';
import {AboutView} from './about.ios';
import {HelpView} from './help.ios';
import {SettingsView} from './settings.ios';
import {UIActions} from '../actions/uiActions';
import {ItemCategory} from '../models/itemModel';

var {
    StyleSheet,
    Text,
    View,
    Navigator
    } = React;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    sideMenu: {
        paddingTop: 50,
    },
    sideMenuTitle: {
        color: '#FFFFFF',
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    sideMenuItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        color: '#788195'

    },
    sideMenuItemActive: {
        color: '#FFFFFF',
        fontWeight: '500'
    },
    sideMenuSecondaryItemsContainer: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row'
    },
    sideMenuSecondaryItem: {
        marginRight: 25
    },
    sideMenuSecondaryItemActive: {
        color: '#FFFFFF'
    }
});

class IntialView extends React.Component {

    render() {
        const menu = <SideMenuView navigator={this.props.navigator}/>;

        /* isOpen not working at the moment */
        return (
            <SideMenu menu={menu} isOpen={false}>
                <DashboardView />
            </SideMenu>
        );
    }

}

class SideMenuView extends React.Component {

    sideMenuItems = [
        {
            key: 'dashboard',
            component: DashboardView,
            title: 'Dashboard'
        },
        {
            key: 'climate',
            component: () => <ItemsView category={ItemCategory.CLIMATE}/>,
            title: 'Climate'
        },
        {
            key: 'lighting',
            component: () => <ItemsView category={ItemCategory.LIGHTING}/>,
            title: 'Lighting'
        },
        {
            key: 'appliances',
            component: () => <ItemsView category={ItemCategory.APPLIANCES}/>,
            title: 'Appliances'
        },
        {
            key: 'security',
            component: () => <ItemsView category={ItemCategory.SECURITY}/>,
            title: 'Security'
        },
        {
            key: 'outdoor',
            component: () => <ItemsView category={ItemCategory.OUTDOOR}/>,
            title: 'Outdoor'
        },
        {
            key: 'car',
            component: () => <ItemsView category={ItemCategory.CAR}/>,
            title: 'Car'
        }
    ];

    secondarySideMenuItems = [
        {
            key: 'settings',
            component: SettingsView,
            title: 'Settings',
            icon: 'cogs'
        },
        {
            key: 'help',
            component: HelpView,
            title: 'Help',
            icon: 'question-circle'
        },
        {
            key: 'about',
            component: AboutView,
            title: 'About',
            icon: 'info-circle'
        }
    ];

    navigate(sideMenuItem) {
        //UIActions.closeSideMenu();

        this.props.navigator.replace({
            key: sideMenuItem.key,
            component: sideMenuItem.component,
            title: sideMenuItem.title
        });
    }

    isActive(sideMenuItem) {
        return sideMenuItem.key == (this.props.route != null ? this.props.route.key : "dashboard");
    }

    render() {
        return (
            <View style={styles.sideMenu}>
                <Text style={styles.sideMenuTitle}>Retro</Text>

                {
                    _.map(this.sideMenuItems, (sideMenuItem) => {

                        return (<Text key={sideMenuItem.key} onPress={this.navigate.bind(this, sideMenuItem)}
                                      style={[styles.sideMenuItem, this.isActive(sideMenuItem) && styles.sideMenuItemActive]}>{sideMenuItem.title}</Text>);

                    })

                }
                <View style={styles.sideMenuSecondaryItemsContainer}>

                    {

                        _.map(this.secondarySideMenuItems, (sideMenuItem) => {

                            return (<Icon key={sideMenuItem.key} name={sideMenuItem.icon} size={25} color="#788195"
                                          onPress={this.navigate.bind(this, sideMenuItem)}
                                          style={[styles.sideMenuSecondaryItem, this.isActive(sideMenuItem) && styles.sideMenuSecondaryItemActive]}/>);

                        })


                    }

                    <Icon name="sign-out" size={25} color="#788195"  style={styles.sideMenuSecondaryItem} />

                </View>
            </View>
        );
    }

}

export class NavigationView extends React.Component {

    render() {
        return (
            <Navigator initialRoute={{component: IntialView, title: 'Retro'}}
                       renderScene={(route, navigator) => {
                            if(route.component) {
                                const menu = <SideMenuView navigator={navigator} route={route} />;

                                /* isOpen not working at the moment */
                                return (
                                    <SideMenu menu={menu} isOpen={false}>
                                        { React.createElement(route.component, { navigator }) }
                                    </SideMenu>
                                )

                            }
                    }}
            />
        )
    }

}

