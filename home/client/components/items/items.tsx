/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react-redux/react-redux.d.ts" />
import React = require('react');
import { connect } from 'react-redux'

import {ItemModel, ItemCategory, ItemType} from "../../models/itemModel";
import {CommandType} from "../../models/commandModel";
import {LocationModel} from "../../models/locationModel";
import {Utils} from "../../utils/utils";
import * as Appliances from "./appliancesItems";
import * as Car from "./carItems";
import * as Climate from "./climateItems";
import * as Lighting from "./lightingItems";
import * as Outdoor from "./outdoorItems";
import * as Security from "./securityItems";

export interface SingleItemComponentProps extends React.Props<any> {
    item: ItemModel
}

function tabpaneConent(filteredItems, bgImage) {

    return <div className="tab-content" style={{'minHeight': '88vh', 'position': 'relative'}}>
        <div className={"animated pulse infinite animate-15s bg-item " + bgImage}></div>
        <div className="tab-pane active" id="tab">
            <div className="row column-seperation">
                <div className="col-md-12">

                    <div className="row">

                        {
                            filteredItems.map((item: ItemModel) => {

                                var component = <div></div>;
                                switch(item.type) {
                                    case ItemType.AIR_CONDITIONING:
                                        component = <Climate.AirConditioningItemComponent
                                            item={item}/>;
                                        break;
                                    case ItemType.AIR_PURIFIER:
                                        component = <Climate.AirPurifierItemComponent item={item}/>;
                                        break;
                                    case ItemType.BODY_WEIGHT:
                                        component = <Appliances.BodyWeightItemComponent item={item}/>;
                                        break;
                                    case ItemType.CCTV:
                                        component = <Security.CCTVItemComponent item={item}/>;
                                        break;
                                    case ItemType.COFFEE_MACHINE:
                                        component = <Appliances.CoffeeMachineItemComponent item={item}/>;
                                        break;
                                    case ItemType.COLOR_DIMMER:
                                        component = <Lighting.ColorDimmerItemComponent item={item}/>;
                                        break;
                                    case ItemType.COLOR_LIGHT:
                                        component = <Lighting.ColorLightItemComponent item={item}/>;
                                        break;
                                    case ItemType.COOKER_HOOD:
                                        component = <Appliances.CookerHoodItemComponent item={item}/>;
                                        break;
                                    case ItemType.DIMMER:
                                        component = <Lighting.DimmerComponent item={item}/>;
                                        break;
                                    case ItemType.DISH_WASHER:
                                        component = <Appliances.DishwasherItemComponent item={item}/>;
                                        break;
                                    case ItemType.DOOR_LOCK:
                                        component = <Security.DoorLockItemComponent item={item}/>;
                                        break;
                                    case ItemType.GARAGE_DOOR:
                                        component = <Car.GarageDoorItemComponent item={item}/>;
                                        break;
                                    case ItemType.HEART_RATE_MONITOR:
                                        component = <Appliances.HeartRateMonitorItemComponent item={item}/>;
                                        break;
                                    case ItemType.HOT_PLATE:
                                        component = <Appliances.HotPlateItemComponent item={item}/>;
                                        break;
                                    case ItemType.LIGHT:
                                        component = <Lighting.LightItemComponent item={item}/>;
                                        break;
                                    case ItemType.MICROWAVE:
                                        component = <Appliances.MicrowaveItemComponent item={item}/>;
                                        break;
                                    case ItemType.OVEN:
                                        component = <Appliances.OvenItemComponent item={item}/>;
                                        break;
                                    case ItemType.REFRIGERATOR:
                                        component = <Appliances.RefrigeratorItemComponent item={item}/>;
                                        break;
                                    case ItemType.SMOKE_DETECTOR:
                                        component = <Security.SmokeDetectorItemComponent item={item}/>;
                                        break;
                                    case ItemType.SWITCH:
                                        component = <Appliances.SwitchItemComponent item={item}/>;
                                        break;
                                    case ItemType.THERMOSTAT:
                                        component = <Climate.ThermostatItemComponent item={item}/>;
                                        break;
                                    case ItemType.VENTILATOR:
                                        component = <Climate.VentilatorItemComponent item={item}/>;
                                        break;
                                    case ItemType.WASHING_MACHINE:
                                        component = <Appliances.WashingMachineItemComponent item={item}/>;
                                        break;
                                    case ItemType.WEATHER_STATION:
                                        component = <Climate.WeatherStationItemComponent item={item}/>;
                                        break;
                                    case ItemType.WINDOW_CONTACT:
                                        component = <Security.WindowContactItemComponent item={item}/>;
                                        break;
                                    case ItemType.WINDOW_SHUTTER:
                                        component = <Security.WindowShutterItemComponent item={item}/>;
                                        break;
                                    }

                                return <div className="col-md-4 m-b-20" key={item.id}>
                                    {component}
                                </div>

                                })
                            }

                    </div>

                </div>
            </div>
        </div>
    </div>

}

interface CategoryItemComponentProps extends React.Props<any> {
    category: ItemCategory
    locations?: Array<LocationModel>
    items?: Array<ItemModel>
}

interface CategoryItemComponentStates {
    currentLocation?: LocationModel,
    items?: Array<ItemModel>,
    locations?: Array<LocationModel>
    filteredItems?: Array<ItemModel>
}

class CategoryItemComponent extends React.Component<CategoryItemComponentProps, CategoryItemComponentStates> {
    state = {
        currentLocation: null,
        items: [],
        locations: [],
        filteredItems: []
    };

    update(props:CategoryItemComponentProps) {
        let items = _.filter(props.items, {category: props.category});
        let locations:Array<LocationModel> = [];
        _.forEach(items, (item:ItemModel) => {
            var location = _.find(locations, {id: item.locationId});
            if (location == null) {
                locations.push(_.find(this.props.locations, {id: item.locationId}));
            }
        });
        locations = _.sortBy(locations, 'title');

        var filteredItems = [];
        if (this.state.currentLocation == null) {
            filteredItems = _.filter(items, {isFavorite: true});
        } else {
            filteredItems = _.filter(items, {locationId: this.state.currentLocation.id});
        }

        this.setState({
            items: items,
            locations: locations,
            filteredItems: filteredItems
        });
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps);
    }

    componentWillMount() {
        this.update(this.props);
    }

    filterFavorites() {
        var items = _.filter(this.state.items, {isFavorite: true});

        this.setState({
            currentLocation: null,
            filteredItems: items
        });
    }

    filterLocation(location:LocationModel) {
        this.setState({
            currentLocation: location,
            filteredItems: _.filter(this.state.items, {locationId: location.id})
        });
    }

    render() {

        var bgImage;
        if (this.props.category == ItemCategory.APPLIANCES) bgImage = 'bg-appliances';
        if (this.props.category == ItemCategory.CAR) bgImage = 'bg-car';
        if (this.props.category == ItemCategory.CLIMATE) bgImage = 'bg-climate';
        if (this.props.category == ItemCategory.LIGHTING) bgImage = 'bg-lighting';
        if (this.props.category == ItemCategory.OUTDOOR) bgImage = 'bg-outdoor';
        if (this.props.category == ItemCategory.SECURITY) bgImage = 'bg-security';

        return (

            <div className="panel panel-transparent m-b-0">

                <ul className="nav nav-tabs nav-tabs-fillup">
                    <li className={ this.state.currentLocation == null ? 'active': '' }>
                        <a onClick={this.filterFavorites.bind(this)}>
                            <span>Favorites</span>
                        </a>
                    </li>
                    { _.map(this.state.locations, (location: LocationModel) => {
                        return <li key={location.id}
                                   className={ this.state.currentLocation === location ? 'active': '' }>
                            <a onClick={this.filterLocation.bind(this, location)}>
                                <span>{location.title}</span>
                            </a>
                        </li>
                        }) }

                </ul>

                {tabpaneConent(this.state.filteredItems, bgImage)}

            </div>

        )
    }
}

let ConnectedCategoryItemComponent = connect(
    function mapStateToProps(state) {
        return {
            items: state.items,
            locations: state.locations
        }
    }
)(CategoryItemComponent);

export var AppliancesItems = React.createClass({
    render: function () {
        return (
            <ConnectedCategoryItemComponent category={ItemCategory.APPLIANCES}/>
        )
    }
});

export var CarItems = React.createClass({
    render: function () {
        return (
            <ConnectedCategoryItemComponent category={ItemCategory.CAR}/>
        )
    }
});

export var ClimateItems = React.createClass({
    render: function () {
        return (
            <ConnectedCategoryItemComponent category={ItemCategory.CLIMATE}/>
        )
    }
});

export var LightingItems = React.createClass({
    render: function () {
        return (
            <ConnectedCategoryItemComponent category={ItemCategory.LIGHTING}/>
        )
    }
});

export var OutdoorItems = React.createClass({
    render: function () {
        return (
            <ConnectedCategoryItemComponent category={ItemCategory.OUTDOOR}/>
        )
    }
});

export var SecurityItems = React.createClass({
    render: function () {
        return (
            <ConnectedCategoryItemComponent category={ItemCategory.SECURITY}/>
        )
    }
});

interface LocationItemComponentProps extends React.Props<any> {
    locations?: Array<LocationModel>
    items?: Array<ItemModel>
    params?: any
}

interface LocationItemComponentStates {
    showFavorites?: boolean,
    showAll?: boolean
    items?: Array<ItemModel>,
    location?: LocationModel,
    filteredItems?: Array<ItemModel>
}


class LocationItemComponentDef extends React.Component<LocationItemComponentProps, LocationItemComponentStates> {
    state = {
        items: [],
        location: null,
        filteredItems: [],
        showFavorites: true,
        showAll: false
    };

    update(props:LocationItemComponentProps) {
        let items = _.filter(props.items, {locationId: this.props.params.locationId});

        var filteredItems = [];
        if (this.state.showFavorites) {
            filteredItems = _.filter(items, {isFavorite: true});
        } else if (this.state.showAll) {
            filteredItems = items;
        }

        var location = _.find(props.locations, {id: this.props.params.locationId});

        this.setState({
            location: location,
            items: items,
            filteredItems: filteredItems
        });
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps);
    }

    componentWillMount() {
        this.update(this.props);
    }

    filterFavorites() {
        var items = _.filter(this.state.items, {isFavorite: true});

        this.setState({
            showFavorites: true,
            showAll: false,
            filteredItems: items
        });
    }

    filterAll() {
        this.setState({
            showFavorites: false,
            showAll: true,
            filteredItems: this.state.items
        });
    }

    render() {

        var bgImage;
        //if (this.props.category == ItemCategory.APPLIANCES) bgImage = 'bg-appliances';
        //if (this.props.category == ItemCategory.CAR) bgImage = 'bg-car';
        //if (this.props.category == ItemCategory.CLIMATE) bgImage = 'bg-climate';
        //if (this.props.category == ItemCategory.LIGHTING) bgImage = 'bg-lighting';
        //if (this.props.category == ItemCategory.OUTDOOR) bgImage = 'bg-outdoor';
        //if (this.props.category == ItemCategory.SECURITY) bgImage = 'bg-security';

        return (

            <div className="panel panel-transparent m-b-0">

                <ul className="nav nav-tabs nav-tabs-fillup">
                    <li className={ this.state.showFavorites ? 'active': '' }>
                        <a onClick={this.filterFavorites.bind(this)}>
                            <span>Favorites</span>
                        </a>
                    </li>
                    <li className={ this.state.showAll ? 'active': '' }>
                        <a onClick={this.filterAll.bind(this)}>
                            <span>All</span>
                        </a>
                    </li>

                </ul>

                {tabpaneConent(this.state.filteredItems, bgImage)}

            </div>

        )
    }
}

export var LocationItemComponent = connect(
    function mapStateToProps(state) {
        return {
            items: state.items,
            locations: state.locations
        }
    }
)(LocationItemComponentDef);