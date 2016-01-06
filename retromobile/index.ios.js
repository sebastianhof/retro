'use strict';
var React = require('react-native');

import {Provider} from 'react-redux';
import {Store} from './app/stores/store';
import {NavigationView} from './app/components/navigation.ios';
import {SettingsActions} from './app/actions/settingsActions';

var {
    NetInfo,
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

/**
 * Init retromobile
 */
function init() {

    NetInfo.fetch().done((reach) => {

        if (reach == 'wifi') {
            SettingsActions.connectToHub();
        } else if (reach == 'cell') {
            SettingsActions.connectToCloud();
        } else {
            SettingsActions.disconnectFromHub();
        }

    });

    NetInfo.addEventListener(
        'change',
        (reach) => {

            if (reach == 'wifi') {
                SettingsActions.connectToHub();
            } else if (reach == 'cell') {

                if (Store.getState().settings.useCloud) {
                    SettingsActions.connectToCloud();
                } else {
                    SettingsActions.disconnectFromHub();
                }


            } else {
                SettingsActions.disconnectFromHub();
            }

        }
    );

    //
}

init();

AppRegistry.registerComponent('retromobile', () => retromobile);
