'use strict';
var React = require('react-native');

import {Provider} from 'react-redux';
import {Store} from './app/stores/store';
import {NavigationView} from './app/components/navigation.ios';

var {
    AppRegistry,
    } = React;

var retromobile = React.createClass({
    render: function () {
        return (

            <Provider store={Store}>
                <NavigationView />
            </Provider>

        );
    }
});

AppRegistry.registerComponent('retromobile', () => retromobile);
