'use strict';
import React from  'react-native';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import {connect} from 'react-redux';
import {DashboardView} from './dashboard.ios';
import {ItemsView} from './items.ios';
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

class SideMenuView extends React.Component {

    navigate(sideMenuItem) {
        UIActions.closeSideMenu();

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
                title: 'Dashboard'
            },
            {
                key: 'climate',
                title: 'Climate'
            },
            {
                key: 'lighting',
                title: 'Lighting'
            },
            {
                key: 'appliances',
                title: 'Appliances'
            },
            {
                key: 'security',
                title: 'Security'
            },
            {
                key: 'outdoor',
                title: 'Outdoor'
            },
            {
                key: 'car',
                title: 'Car'
            }
        ];

        let secondarySideMenuItems = [
            {
                key: 'settings',
                title: 'Settings',
                icon: 'cogs'
            },
            {
                key: 'help',
                title: 'Help',
                icon: 'question-circle'
            }
        ];

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
            <Navigator initialRoute={{key: 'dashboard', title: 'Dashboard'}}
                       renderScene={(route, navigator) => {

                                const menu = <SideMenuView navigator={navigator} route={route} />;

                                let view;
                                switch (route.key) {
                                    case 'dashboard':
                                        view =  (<DashboardView navigator={navigator} />);
                                        break;
                                    case 'settings':
                                        view =  (<SettingsView navigator={navigator} />);
                                        break;
                                    case 'help':
                                        view =  (<HelpView navigator={navigator} />);
                                        break;
                                    case 'climate':
                                        view = (<ItemsView navigator={navigator} category={ItemCategory.CLIMATE}/>);
                                        break;
                                    case 'lighting':
                                        view = (<ItemsView navigator={navigator} category={ItemCategory.LIGHTING}/>);
                                        break;
                                    case 'appliances':
                                        view = (<ItemsView navigator={navigator} category={ItemCategory.APPLIANCES}/>);
                                        break;
                                    case 'security':
                                        view = (<ItemsView navigator={navigator} category={ItemCategory.SECURITY}/>);
                                        break;
                                    case 'outdoor':
                                        view = (<ItemsView navigator={navigator} category={ItemCategory.OUTDOOR}/>);
                                        break;
                                    case 'car':
                                        view = (<ItemsView navigator={navigator} category={ItemCategory.CAR}/>);
                                        break;
                                    default:
                                        view = React.createElement(route.component, {navigator});
                                }

                                /* isOpen not working at the moment */
                                return (
                                    <SideMenu menu={menu} isOpen={this.props.ui.showSideMenu}>
                                        { view }
                                    </SideMenu>
                                )

                            }
                    }
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