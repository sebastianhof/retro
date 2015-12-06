/// <reference path="../../../typings/react/react.d.ts" />
import React = require('react');


export interface DashboardShortcutComponentProperties {

}

export class DashboardShortcutComponent extends React.Component<DashboardShortcutComponentProperties, any> {

    render() {

        return (
            <div className="panel no-border bg-primary">
                <div className="panel-heading">
                    <div className="panel-title">Shortcut</div>
                </div>
                <div className="panel-body">
                    <div className="padding-25">
                        <h5 className="text-white"></h5>
                        {/* ng-repeat="command in item.commands" */}

                        <br />

                        <button type="button" className="btn btn-master btn-cons btn-animated from-left fa fa-play">
                            <span>Run</span>
                        </button>

                    </div>
                </div>

            </div>
        )
    }
}