/// <reference path="../../../typings/react/react.d.ts" />
import React =  require('react');
import {NotificationsHeaderComponent} from './app.header.notifications.tsx';
import {CommandsHeaderComponent} from './app.header.commands.tsx'
import {UsersHeaderComponent} from './app.header.users.tsx'
import {UserModel} from "../../models/userModel";

export class AppHeaderComponent extends React.Component<any, any> {

    render() {

        let user:UserModel = {
            firstname: 'Sebastian',
            lastname: 'Hof'
        };

        return (
            <div className="header">
                {/*<!-- START MOBILE CONTROLS -->*/}
                <div className="pull-left full-height visible-sm visible-xs">
                    <div className="sm-action-bar">
                        <a className="btn-link toggle-sidebar"> {/* // data-toggle="sidebar"*/}
                            <i className="icon-set menu-hambuger"></i>
                        </a>
                    </div>
                </div>
                {/*<!-- END MOBILE CONTROLS -->*/}
                <div className="pull-left sm-table">
                    <div className="header-inner">
                        <div className="brand inline">
                            <img src={require("../../images/retro-logo.png")} alt="retro" height="22"/>
                        </div>

                        <NotificationsHeaderComponent />

                        <CommandsHeaderComponent />

                    </div>
                </div>
                <div className="pull-right">
                    <UsersHeaderComponent user={user}/>
                </div>
            </div>
        );

    }

}

