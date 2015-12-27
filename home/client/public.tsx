/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react/react-dom.d.ts" />
import 'jquery';
import 'bootstrap';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

import "./styles/pages-icons.css"
import "./styles/pages.css"
import "./styles/public.css"

import React =  require('react');
import ReactDOM =  require('react-dom');

ReactDOM.render(

    <div className="login-wrapper">
        <div className="bg-pic">
            <img src={require("./images/retro-bg.jpg")} alt="" className="lazy"/>
            <div className="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
                <h2 className="semi-bold text-white">Retro</h2>

                <p className="small">
                    <span className="hint-text">Copyright © 2015</span>
                    <span className="font-montserrat">Retro</span>.
                    <span className="hint-text">All rights reserved.</span>
                    <span className="sm-block">
                        <a href="" className="m-l-10 m-r-10">Terms of use</a>
                        |
                        <a href="" className="m-l-10">Privacy Policy</a>
                    </span>
                </p>
            </div>
        </div>

        <div className="login-container bg-white">
            <div className="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
                <img src={require('./images/retro-logo.png')} alt="logo" height="22"/>

                <p className="p-t-35">Sign into retro smart control</p>
                <form id="form-login" className="p-t-15" role="form" action="/api/signin" method="post">
                    <div className="form-group form-group-default">
                        <label>Login</label>

                        <div className="controls">
                            <input type="text" name="username" placeholder="User Name" className="form-control"
                                   required={true}/>
                        </div>
                    </div>
                    <div className="form-group form-group-default">
                        <label>Password</label>

                        <div className="controls">
                            <input type="password" className="form-control" name="password" placeholder="Credentials"
                                   required={true}/>
                        </div>
                    </div>
                    <button className="btn btn-default btn-cons m-t-10" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    </div>, document.getElementById('public'));
