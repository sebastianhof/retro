/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react-router/react-router.d.ts" />
import React = require('react');
import ReactDOM =  require('react-dom');

import AppSidebarComponent from "./app.sidebar";
import {AppHeaderComponent} from './app.header';
import {AppFooterComponent} from './app.footer';
import {CommandsWindowComponent} from '../commands/commands.window.tsx';
import { Router, Route, Link } from 'react-router'
import {DashboardComponent} from "../dashboard/dashboard";
import {AppliancesItems, ClimateItems, CarItems, LightingItems, OutdoorItems, SecurityItems, LocationItemComponent} from "../items/items";
import {ItemCategory} from "../../models/itemModel";
import {SettingsComponent} from "../settings/settings";

export class AppBodyComponent extends React.Component<any, any> {

    render() {

        return (
            <div className="full-height">
                <AppSidebarComponent />
                <div className="page-container"></div>
                <div className="page-container">
                    <AppHeaderComponent />
                    <div className="page-content-wrapper">
                        <div className="content">
                            <div className="full-height full-width">

                                <Router>
                                    <Route path="/" component={DashboardComponent}/>
                                    <Route path="/dashboard" component={DashboardComponent}/>
                                    <Route path="/climate" component={ClimateItems}/>
                                    <Route path="/lighting" component={LightingItems}/>
                                    <Route path="/appliances" component={AppliancesItems}/>
                                    <Route path="/security" component={SecurityItems}/>
                                    <Route path="/outdoor" component={OutdoorItems}/>
                                    <Route path="/car" component={CarItems}/>
                                    <Route path="/rooms/:locationId" component={LocationItemComponent}/>
                                    <Route path="/settings" component={SettingsComponent}/>
                                    {/*<Route path="/" component={App}>
                                     <Route path="about" component={About}/>
                                     <Route path="users" component={Users}>
                                     <Route path="/user/:userId" component={User}/>
                                     </Route>
                                     <Route path="*" component={NoMatch}/>
                                     </Route>*/}
                                </Router>

                            </div>
                        </div>
                    </div>
                </div>
                {/*<CommandWindow />*/}
            </div>
        );
    }

}
