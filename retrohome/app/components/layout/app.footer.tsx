/// <reference path="../../../typings/react/react.d.ts" />
import React =  require('react');

export class AppFooterComponent extends React.Component<any, any> {

    render() {

        return (
            <div className="container-fluid container-fixed-lg footer">
                <div className="copyright sm-text-center">
                    <p className="small no-margin pull-left sm-pull-reset">
                        <span className="hint-text">Copyright © 2015</span>
                        <span className="font-montserrat">Retro</span>.
                        <span className="hint-text">All rights reserved.</span>
                        <span className="sm-block">
                            <a href="#/terms" className="m-l-10 m-r-10">Terms of use</a>
                            |
                            <a href="#/privacy" className="m-l-10">Privacy Policy</a>
                        </span>
                    </p>
                    <p className="small no-margin pull-right sm-pull-reset">
                        <span className="hint-text">Made with Love</span>
                    </p>
                    <div className="clearfix"></div>
                </div>
            </div>
        );

    }

}