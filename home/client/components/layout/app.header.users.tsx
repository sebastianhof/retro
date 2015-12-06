/// <reference path="../../../typings/react/react.d.ts" />
import * as React from 'react';
import {UserModel} from "../../models/userModel";

export interface UsersHeaderComponentProps extends React.Props<any> {
    user: UserModel,
}

export class UsersHeaderComponent extends React.Component<UsersHeaderComponentProps, any> {

    componentDidMount() {
        //var ref: any = this.refs;
        //var func: any = $(ref.profileDropdownToggle);
        //func.toggle();
    }

    render() {

        return (
            <div className="visible-lg visible-md m-t-10">
                <div className="pull-left p-r-10 p-t-10 fs-16 font-heading">
                    <span className="semi-bold">{this.props.user.firstname} </span>
                    <span className="text-master">{this.props.user.lastname}</span>
                </div>
                <div className="dropdown pull-right">
                    <button ref="profileDropdownToggle" className="profile-dropdown-toggle dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        <span className="thumbnail-wrapper d32 circular inline m-t-5">
                            <i className="fa fa-caret-down"></i>
                        </span>
                    </button>
                    <ul className="dropdown-menu profile-dropdown" role="menu">
                        <li>
                            <a href="#/settings">
                                <i className="fa fa-cogs"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/feedback">
                                <i className="fa fa-comment"></i>
                                <span>Feedback</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/help">
                                <i className="fa fa-question-circle"></i>
                                <span>Help</span>
                            </a>
                        </li>
                        <li className="bg-master-lighter">
                            <a className="clearfix" href="/api/signout">
                                <span className="pull-left">Logout</span>
                                <span className="pull-right">
                                    <i className="fa fa-sign-out"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

}