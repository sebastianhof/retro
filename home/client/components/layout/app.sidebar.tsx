/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react-redux/react-redux.d.ts" />
import React = require('react');
import { connect } from 'react-redux'
import {LocationModel} from "../../models/locationModel";

interface AppSidebarComponentProperties extends React.Props<any> {
    locations?: Array<LocationModel>
}

interface AppSidebarComponentStates {
    showCategories: boolean,
    showLocations: boolean
}

class AppSidebarComponent extends React.Component<AppSidebarComponentProperties, AppSidebarComponentStates> {

    constructor(props:AppSidebarComponentProperties) {
        super(props);

        this.state = {
            showCategories: true,
            showLocations: true
        };
    }

    toggleMenu() {
        if (this.state.showCategories) {
            this.setState({
                showCategories: false,
                showLocations: true
            });
        } else if (this.state.showLocations) {
            this.setState({
                showCategories: true,
                showLocations: false
            });
        }
    }

    render() {

        let sidebarIcon;
        let sidebarMenu;
        if (this.state.showCategories) {

            sidebarIcon = <i className="fa fa-list fs-16"></i>

            sidebarMenu = <div className="sidebar-menu  m-t-30">
                <ul className="menu-items">
                    <li>
                        <a href="#/dashboard">
                            <span className="title">Dashboard</span>
                        </a>
                        <span className="icon-thumbnail">
                            <i className="fa fa-tachometer"></i>
                        </span>
                    </li>
                    <li className="">
                        <a href="#/climate">
                            <span className="title">Climate</span>
                        </a>
                        <span className="icon-thumbnail">
                            <i className="fa fa-sun-o"></i>
                        </span>
                    </li>
                    <li className="">
                        <a href="#/lighting">
                            <span className="title">Lighting</span>
                        </a>
                        <span className="icon-thumbnail">
                            <i className="fa fa-lightbulb-o"></i>
                        </span>
                    </li>
                    <li className="">
                        <a href="#/appliances">
                            <span className="title">Appliances</span>
                        </a>
                        <span className="icon-thumbnail">
                            <i className="fa fa-plug"></i>
                        </span>
                    </li>
                    <li className="">
                        <a href="#/security">
                            <span className="title">Security</span>
                        </a>
                        <span className="icon-thumbnail">
                            <i className="fa fa-lock"></i>
                        </span>
                    </li>
                    <li className="">
                        <a href="#/outdoor">
                            <span className="title">Outdoor</span>
                        </a>
                        <span className="icon-thumbnail">
                            <i className="fa fa-tree"></i>
                        </span>
                    </li>
                    <li className="">
                        <a href="#/car">
                            <span className="title">Car</span>
                        </a>
                        <span className="icon-thumbnail">
                            <i className="fa fa-automobile"></i>
                        </span>
                    </li>
                    <li className="">
                        <a href="#/settings">
                            <span className="title">Settings</span>
                        </a>
                        <span className="icon-thumbnail">
                            <i className="fa fa-cogs"></i>
                        </span>
                    </li>
                </ul>
                <div className="clearfix"></div>
            </div>

        } else if (this.state.showLocations) {

            sidebarIcon = <i className="fa fa-list-ul fs-16"></i>

            sidebarMenu = <div className="sidebar-menu  m-t-30">
                <ul className="menu-items">

                    { _.map(this.props.locations, (location) => {
                        var locationRef= "#/rooms/" + location.id

                        return <li key={location.id}>
                            <a href={locationRef}>
                                <span className="title">{location.title}</span>
                            </a>
                        </li>

                        })}

                </ul>
                <div className="clearfix"></div>

            </div>

        }

        return (

            <div className="page-sidebar">
                <div className="sidebar-header">
                    <img src="images/retro-logo.png" alt="logo" className="brand" width="78" height="22"/>

                    <div className="sidebar-header-controls">
                        <button className="btn btn-xs btn-link m-l-20" type="button"
                                onClick={this.toggleMenu.bind(this)}>
                            {sidebarIcon}
                        </button>
                        <button className="btn btn-link visible-lg-inline" type="button">
                            <i className="fa fa-close"></i>
                         </button>
                    </div>
                </div>

                {sidebarMenu}

            </div>

        )
    }

}

export default connect(
    function mapStateToProps(state) {
        return {
            locations: state.locations,
            showSidebar: state.showSidebar
        }
    }
)(AppSidebarComponent);