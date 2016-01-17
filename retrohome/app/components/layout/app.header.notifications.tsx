/// <reference path="../../../typings/react/react.d.ts" />
import React =  require('react');

export class NotificationsHeaderComponent extends React.Component<any, any> {

    render() {

        return (
            <ul className="notification-list no-margin hidden-sm hidden-xs b-grey b-l b-r no-style p-l-30 p-r-20">
                <li className="p-r-15 inline">
                    <div className="dropdown">
                        <a id="notification-center dropdown-toggle" className="fa fa-feed" data-toggle="dropdown">
                            {/*<span className="bubble"></span>*/}
                        </a>
                        <div className="dropdown-menu notification-toggle" role="menu"
                             aria-labelledby="notification-center">
                            <div className="notification-panel">
                                <div className="notification-body">
                                    {/*<!-- START Notification Item-->*/}
                                    <div className="notification-item  clearfix">
                                        <div className="heading">
                                            <a href="" className="text-danger">
                                                <i className="fa fa-lightbulb-o m-r-10"></i>
                                                <span className="bold">Turned on Kitchen Light</span>
                                                <span className="fs-12 m-l-10">Turn off</span>
                                            </a>
                                            <span className="pull-right time">2 mins ago</span>
                                        </div>
                                        <div className="option">
                                            <a className="mark"></a>
                                        </div>
                                    </div>
                                    {/*<!-- END Notification Item-->*/}
                                </div>
                                <div className="notification-footer text-center">
                                    <a className="">Read all activities</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

        )
    }
}