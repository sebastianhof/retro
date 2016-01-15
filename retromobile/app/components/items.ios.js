'use strict';
import React from  'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { connect } from 'react-redux'
import {ItemType, ItemCategory, itemCategoryToTitle} from '../models/itemModel';
import {LeftNavigationBarIcon} from './navigation.ios';
import {ThermostatView, WeatherStationView} from './items/climate';
import {LightView, DimmerView, ColorLightView, ColorDimmerView} from './items/lighting';
import {SwitchView, BodyWeightView} from './items/appliances';
import {CCTVView, DoorLockView, DoorContactView, WindowContactView, SmokeDetectorView} from './items/security';
import {GarageDoorView} from './items/car';
import {HubConnectionStatus} from '../models/settingsModel';
import {NotificationView} from './notification.ios';
import {SetupConnectionView} from './settings/setupConnection';

var {
    StyleSheet,
    Text,
    View,
    Modal,
    Switch,
    ListView
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    rightNavigationBarIcon: {
        marginRight: 16
    },
    filterContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    filterHeader: {
        alignSelf: 'center',
        fontFamily: 'Open Sans',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 32
    },
    filterHeading: {
        alignSelf: 'flex-start',
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '500',
        paddingTop: 16,
        paddingLeft: 16
    },
    filterItemView: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'space-between'
    },
    filterItemText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300'
    },
    filterItemSwitch: {
        alignSelf: 'flex-end'
    },
    filterButton: {
        alignSelf: 'center',
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '300',
        marginTop: 32,
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 32
    }
});

class ItemsViewComponent extends React.Component {

    state = {
        showFavorites: false,
        showFilterPane: false,
        showNotificationPane: false,
        items: [],
        locations: [],
        filteredLocationIds: [],
        filteredCategoryIds: [],
        filteredItems: new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        })
    };

    update(props) {

        let showNotificationPane = false;
        switch (props.settings['hubConnectionStatus']) {
            case HubConnectionStatus.CONNECTING:
            case HubConnectionStatus.NOT_CONNECTED:
            case HubConnectionStatus.NOT_FOUND:
                showNotificationPane = true;
        }

        let items;
        let categories = [];
        let locations = [];
        let filteredLocationIds = this.state.filteredLocationIds;
        let filteredCategoryIds = this.state.filteredCategoryIds;
        let showFavorites = this.state.showFavorites;

        if (props.category != null) {

            items = _.filter(props.items, {category: this.props.category});

            _.forEach(items, (item) => {
                let location = _.find(locations, {id: item.locationId});
                if (location == null) {
                    locations.push(_.find(this.props.locations, {id: item.locationId}));
                }
            });
            locations = _.sortBy(locations, 'title');

            if (filteredLocationIds.length == 0) {
                filteredLocationIds = _.pluck(locations, 'id');
            }
        } else if (props.location != null) {
            items = _.filter(props.items, {locationId: this.props.location.id});

            _.forEach(items, (item) => {
                let category = _.find(categories, item.category);
                if (category == null) {
                    categories.push(item.category);
                }
            });
            categories = _.sortBy(categories);

            if (filteredCategoryIds.length == 0) {
                filteredCategoryIds = categories;
            }
        }

        this.setState({
            showNotificationPane: showNotificationPane,
            items: items,
            locations: locations,
            categories: categories,
            filteredLocationIds: filteredLocationIds,
            filteredCategoryIds: filteredCategoryIds,
            filteredItems: this.state.filteredItems.cloneWithRows(this.filterItems(items, showFavorites, filteredLocationIds, filteredCategoryIds))
        });
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps);
    }

    componentWillMount() {
        this.update(this.props);
    }

    filterItems(items, showFavorites, filteredLocationIds, filteredCategoryIds) {

        let filteredItems = items;
        if (showFavorites) {
            filteredItems = _.filter(filteredItems, {isFavorite: true});
        }

        if (filteredLocationIds.length > 0) {
            filteredItems = _.filter(filteredItems, (item) => {
                return _.contains(filteredLocationIds, item.locationId);
            });
        }
        if (filteredCategoryIds.length > 0) {
            filteredItems = _.filter(filteredItems, (item) => {
                return _.contains(filteredCategoryIds, item.category);
            });
        }

        return filteredItems;

    }

    filter(showFavorites, filteredLocationIds, filteredCategoryIds) {

        this.setState({
            showFavorites: showFavorites,
            filteredLocationIds: filteredLocationIds,
            filteredCategoryIds: filteredCategoryIds,
            filteredItems: this.state.filteredItems.cloneWithRows(this.filterItems(this.state.items, showFavorites, filteredLocationIds, filteredCategoryIds))
        });

    }

    render() {

        var navigationBarTitle = itemCategoryToTitle(this.props.category);

        let rightNavigationBarIcon = (
            <Icon name="filter" size={24} color='#ffffff' style={styles.rightNavigationBarIcon} onPress={() => {
                this.setState({showFilterPane: true})
            }}/>
        );

        return (
            <View style={styles.container}>
                <NavigationBar
                    tintColor='#6d5cae'
                    title={{ title: navigationBarTitle, tintColor: '#ffffff' }}
                    leftButton={LeftNavigationBarIcon}
                    rightButton={rightNavigationBarIcon}
                />
                <Modal animated={true} visible={this.state.showFilterPane}>
                    <FilterView
                        locations={this.state.locations}
                        categories={this.state.categories}
                        showFavorites={this.state.showFavorites}
                        filteredLocationIds={this.state.filteredLocationIds}
                        filteredCategoryIds={this.state.filteredCategoryIds}
                        onFilter={this.filter.bind(this)}
                        onClose={() => this.setState({showFilterPane: false})}
                    />
                </Modal>
                <Modal animate={true} visible={this.state.showNotificationPane}>
                    <NotificationView
                        navigator={this.props.navigator}
                        onClose={() => this.setState({showNotificationPane: false})}/>
                </Modal>
                <ListView
                    dataSource={this.state.filteredItems}
                    renderRow={(item) => {

                    switch (item.type) {
                            case ItemType.AIR_CONDITIONING:
                            case ItemType.AIR_PURIFIER:
                                return (<Text key={item.id}>{item.title}</Text>);
                            case ItemType.BODY_WEIGHT:
                                return (<BodyWeightView item={item} />);
                            case ItemType.CCTV:
                                return (<CCTVView item={item} navigator={this.props.navigator} />);
                            case ItemType.COFFEE_MACHINE:
                                return (<Text key={item.id}>{item.title}</Text>);
                            case ItemType.COLOR_DIMMER:
                                return (<ColorDimmerView item={item} />);
                            case ItemType.COLOR_LIGHT:
                                return (<ColorLightView item={item} />);
                            case ItemType.COOKER_HOOD:
                                return (<Text key={item.id}>{item.title}</Text>);
                            case ItemType.DIMMER:
                                return (<DimmerView item={item} />);
                            case ItemType.DISH_WASHER:
                                return (<Text key={item.id}>{item.title}</Text>);
                            case ItemType.DOOR_CONTACT:
                                return (<DoorContactView item={item} />);
                            case ItemType.DOOR_LOCK:
                                return (<DoorLockView item={item} />);
                            case ItemType.GARAGE_DOOR:
                                return (<GarageDoorView item={item} />);
                            case ItemType.HEART_RATE_MONITOR:
                            case ItemType.HOT_PLATE:
                                return (<Text key={item.id}>{item.title}</Text>);
                            case ItemType.LIGHT:
                                return (<LightView item={item} />);
                            case ItemType.MICROWAVE:
                            case ItemType.OVEN:
                            case ItemType.PLANT_SENSOR:
                            case ItemType.REFRIGERATOR:
                                return (<Text key={item.id}>{item.title}</Text>);
                            case ItemType.SMOKE_DETECTOR:
                                return (<SmokeDetectorView item={item} />);
                            case ItemType.SWITCH:
                                return (<SwitchView item={item} />);
                            case ItemType.THERMOSTAT:
                                return (<ThermostatView item={item} />);
                            case ItemType.VENTILATOR:
                            case ItemType.WASHING_MACHINE:
                                return (<Text key={item.id}>{item.title}</Text>);
                            case ItemType.WEATHER_STATION:
                                return (<WeatherStationView item={item} />);
                            case ItemType.WINDOW_CONTACT:
                                return (<WindowContactView item={item} />);
                            case ItemType.WINDOW_SHUTTER:
                            default:
                                return (<Text key={item.id}>{item.title}</Text>);
                        }



                    }}
                />

            </View>
        );
    }

}

class FilterView extends React.Component {

    isInFilteredLocationIds(location) {
        return _.contains(this.props.filteredLocationIds, location.id);
    }

    isInFilteredCategoryIds(category) {
        return _.contains(this.props.filteredCategoryIds, category);
    }

    toggleFavorites(value) {
        this.props.onFilter(value, this.props.filteredLocationIds, this.props.filteredCategoryIds);
    }

    toggleLocation(location, value) {

        if (value) {
            // add
            let idx = _.indexOf(this.props.filteredLocationIds, location.id);
            if (idx == -1) {
                let filteredLocationIds = [
                    ...this.props.filteredLocationIds,
                    location.id
                ];
                this.props.onFilter(this.props.showFavorites, filteredLocationIds, this.props.filteredCategoryIds);
            }
        } else {
            // remove
            let idx = _.indexOf(this.props.filteredLocationIds, location.id);
            if (idx > -1) {
                let filteredLocationIds = [
                    ...this.props.filteredLocationIds.slice(0, idx),
                    ...this.props.filteredLocationIds.slice(idx + 1)
                ];
                this.props.onFilter(this.props.showFavorites, filteredLocationIds, this.props.filteredCategoryIds);
            }
        }

    }

    toggleCategory(category, value) {

        if (value) {
            // add
            let idx = _.indexOf(this.props.filteredCategoryIds, category);
            if (idx == -1) {
                let filteredCategoryIds = [
                    ...this.props.filteredCategoryIds,
                    category
                ];
                this.props.onFilter(this.props.showFavorites, this.props.filteredLocationIds, filteredCategoryIds);
            }
        } else {
            // remove
            let idx = _.indexOf(this.props.filteredCategoryIds, category);
            if (idx > -1) {
                let filteredCategoryIds = [
                    ...this.props.filteredCategoryIds.slice(0, idx),
                    ...this.props.filteredCategoryIds.slice(idx + 1)
                ];
                this.props.onFilter(this.props.showFavorites, this.props.filteredLocationIds, filteredCategoryIds);
            }
        }

    }

    render() {

        var favoritesHeader = (<Text style={styles.filterHeading}>Favorites</Text>);
        var favoritesItems = (<View style={[{flexDirection: 'row', alignItems: 'center'}, styles.filterItemView]}>
            <Text style={styles.filterItemText}>Show favorites only</Text>
            <Switch tintColor="#6d5cae" onTintColor="#6d5cae" style={styles.filterItemSwitch}
                    onValueChange={this.toggleFavorites.bind(this)} value={this.props.showFavorites}/>
        </View>);

        var locationsHeader;
        if (this.props.locations != null && this.props.locations.length > 0) {
            locationsHeader = (<Text style={styles.filterHeading}>Locations</Text>);
        }
        var locationItems = _.map(this.props.locations, (location) => {
            return (
                <View key={location.id}
                      style={[{flexDirection: 'row', alignItems: 'center'}, styles.filterItemView]}>
                    <Text style={styles.filterItemText}>{location.title}</Text>
                    <Switch tintColor="#6d5cae" onTintColor="#6d5cae" style={styles.filterItemSwitch}
                            onValueChange={this.toggleLocation.bind(this, location)}
                            value={this.isInFilteredLocationIds(location)}/>
                </View>
            )
        });

        var categoriesHeader;
        if (this.props.categories != null && this.props.categories.length > 0) {
            categoriesHeader = (<Text style={styles.filterHeading}>Categories</Text>);
        }
        var categoryItems = _.map(this.props.categories, (category) => {
            return (
                <View key={category}
                      style={[{flexDirection: 'row', alignItems: 'center'}, styles.filterItemView]}>
                    <Text style={styles.filterItemText}>{itemCategoryToTitle(category)}</Text>
                    <Switch tintColor="#6d5cae" onTintColor="#6d5cae" style={styles.filterItemSwitch}
                            onValueChange={this.toggleCategory.bind(this, category)}
                            value={this.isInFilteredCategoryIds(category)}/>
                </View>
            )
        });

        return (
            <View style={styles.filterContainer}>
                <Text style={styles.filterHeader}>Apply filter</Text>

                {favoritesHeader}
                {favoritesItems}

                {locationsHeader}
                {locationItems}

                {categoriesHeader}
                {categoryItems}

                <Text
                    onPress={this.props.onClose.bind(this)}
                    style={styles.filterButton}>Close</Text>
            </View>
        )

    }

}

export const ItemsView = connect(function mapStateToProps(state) {
    return {
        items: state.items,
        locations: state.locations,
        settings: state.settings
    }
})(ItemsViewComponent);