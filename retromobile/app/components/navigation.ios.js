'use strict';
import React from  'react-native';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import {connect} from 'react-redux';
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
    Navigator,
    TouchableHighlight
    } = React;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    sideMenu: {
        backgroundColor: '#2b303b',
        paddingTop: 50
    },
    sideMenuTitle: {
        color: '#FFFFFF',
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 30,
        paddingRight: 30
    },
    sideMenuDescription: {
        color: '#FFFFFF',
        fontFamily: 'Open Sans',
        fontSize: 12,
        paddingTop: 5,
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
    },
    leftNavigationBarIcon: {
        marginLeft: 16
    }
});

class InitialView extends React.Component {

    render() {
        const menu = <SideMenuView navigator={this.props.navigator}/>;

        /* isOpen not working at the moment */
        return (
            <SideMenu menu={menu} isOpen={false}>
                <DashboardView navigator={this.props.navigator}/>
            </SideMenu>
        );
    }

}

class SideMenuView extends React.Component {

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

        let sideMenuItems = [
            {
                key: 'dashboard',
                component: DashboardView,
                title: 'Dashboard'
            },
            {
                key: 'climate',
                component: () => {
                    return <ItemsView category={ItemCategory.CLIMATE}/>;
                },
                title: 'Climate'
            },
            {
                key: 'lighting',
                component: () => {
                    return <ItemsView category={ItemCategory.LIGHTING}/>
                },
                title: 'Lighting'
            },
            {
                key: 'appliances',
                component: () => {
                    return <ItemsView category={ItemCategory.APPLIANCES}/>
                },
                title: 'Appliances'
            },
            {
                key: 'security',
                component: () => {
                    return <ItemsView category={ItemCategory.SECURITY}/>
                },
                title: 'Security'
            },
            {
                key: 'outdoor',
                component: () => {
                    return <ItemsView category={ItemCategory.OUTDOOR}/>
                },
                title: 'Outdoor'
            },
            {
                key: 'car',
                component: () => {
                    return <ItemsView category={ItemCategory.CAR}/>
                },
                title: 'Car'
            }
        ];

        let secondarySideMenuItems = [
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
            }
        ];

        //<Text style={styles.sideMenuDescription}>Smart home control</Text>

        return (
            <View style={styles.sideMenu}>
                <Text style={styles.sideMenuTitle}>Retro</Text>
                {
                    _.map(sideMenuItems, (sideMenuItem) => {

                        return (<Text key={sideMenuItem.key} onPress={this.navigate.bind(this, sideMenuItem)}
                                      style={[styles.sideMenuItem, this.isActive(sideMenuItem) && styles.sideMenuItemActive]}>{sideMenuItem.title}</Text>);

                    })

                }
                <View style={styles.sideMenuSecondaryItemsContainer}>

                    {

                        _.map(secondarySideMenuItems, (sideMenuItem) => {

                            return (<Icon key={sideMenuItem.key} name={sideMenuItem.icon} size={25} color="#788195"
                                          onPress={this.navigate.bind(this, sideMenuItem)}
                                          style={[styles.sideMenuSecondaryItem, this.isActive(sideMenuItem) && styles.sideMenuSecondaryItemActive]}/>);

                        })


                    }

                    <Icon name="sign-out" size={25} color="#788195" style={styles.sideMenuSecondaryItem}/>

                </View>
            </View>
        );
    }

}

export class NavigationViewComponent extends React.Component {

    render() {

        return (
            <Navigator initialRoute={{component: InitialView, title: 'Retro'}}
                       renderScene={(route, navigator) => {
                            if(route.component) {
                                const menu = <SideMenuView navigator={navigator} route={route} />;

                                /* isOpen not working at the moment */
                                return (
                                    <SideMenu menu={menu} isOpen={this.props.ui.showSideMenu}>
                                        { React.createElement(route.component, { navigator }) }
                                    </SideMenu>
                                )

                            }
                    }}
            />
        )
    }

}

export const NavigationView = connect(function mapStateToProps(state) {
    return {
        ui: state.ui,
        settings: state.settings
    }
})(NavigationViewComponent);

export const LeftNavigationBarIcon = (
    <Icon name="bars" size={24} color='#ffffff' onPress={() => { UIActions.openSideMenu(); }}
          style={styles.leftNavigationBarIcon}/>
);