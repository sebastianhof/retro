/// <reference path="../../../typings/react/react.d.ts" />
import React = require('react');

interface SettingsComponentProps extends React.Props<any> {
}


export class SettingsComponent extends React.Component<SettingsComponentProps, any> {

    render() {

        return (

            <div className="panel panel-transparent m-b-0">

                <ul className="nav nav-tabs nav-tabs-fillup">
                    <li className="active">
                        <a>
                            <span>Devices</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>Locations</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>Rules</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>Account</span>
                        </a>
                    </li>
                </ul>
                <div className="tab-content">


                </div>

            </div>

        )

    }

}