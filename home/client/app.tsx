/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react/react-dom.d.ts" />
/// <reference path="../typings/react-redux/react-redux.d.ts" />
import "jquery";
import "bootstrap";
import "lodash";
import "scrollReveal";

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-nouislider/example/nouislider.css'
import 'rc-switch/assets/index.css'
import 'animate.css/animate.css';
import "./styles/pages-icons.css"
import "./styles/pages.css"
import "./styles/app.css"

import React =  require('react');
import ReactDOM =  require('react-dom');

import {Provider} from 'react-redux';
import {AppBodyComponent} from "./components/layout/app.body";
import {Store} from "./stores/store"
import {LocationActions} from "./actions/locationActions";
import {ItemActions} from "./actions/itemActions";

ReactDOM.render(
    <Provider store={Store}>
        <AppBodyComponent />
    </Provider>, document.getElementById('app'));

LocationActions.fetchLocations();
ItemActions.fetchItems();

