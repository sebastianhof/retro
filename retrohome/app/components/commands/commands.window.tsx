/// <reference path="../../../typings/react/react.d.ts" />
import * as React from 'react';

export class CommandsWindowComponent extends React.Component<any, any> {

    render() {

        return (
            <div className="overlay" style="display: none"> {/* ng-controller="SearchCtrl" pg-search*/}
                {/*<!-- BEGIN Overlay Content !-->*/}
                <div className="overlay-content has-results m-t-20">
                    {/*<!-- BEGIN Overlay Header !-->*/}
                    <div className="container-fluid">
                        {/*<!-- BEGIN Overlay Logo !-->*/}
                        <img className="overlay-brand" src="app/img/logo.png" alt="logo" width="78" height="22"/> {/* data-src="app/img/logo.png" ui-jq="unveil" data-src-retina="app/img/logo_2x.png"*/}
                        {/*<!-- END Overlay Logo !-->*/}
                        {/*<!-- BEGIN Overlay Close !-->*/}
                        <a href="" className="close-icon-light overlay-close text-black fs-16"> {/* data-search="closeButton"*/}
                            <i className="pg-close"></i>
                        </a>
                        {/*<!-- END Overlay Close !-->*/}
                    </div>
                    {/*<!-- END Overlay Header !-->*/}
                    <div className="container-fluid">
                        {/*<!-- BEGIN Overlay Controls !-->*/}
                        <input  id="overlay-search"
                               className="no-border overlay-search bg-transparent"
                               placeholder="Search..."/> {/* data-search="searchField" autocomplete="off" spellcheck="false" ng-model="search.query" ng-change="liveSearch()" ng-model-options="{ updateOn: 'default blur', debounce: { default: 500, blur: 0 } }"*/}
                        <br />

                        <div className="inline-block">
                            <div className="checkbox right">
                                <input id="checkboxn" type="checkbox" value="1" />
                                <label htmlFor="checkboxn">
                                    <i className="fa fa-search"></i>
                                    Search within page
                                </label>
                            </div>
                        </div>
                        <div className="inline-block m-l-10">
                            <p className="fs-13">Press enter to search</p>
                        </div>
                        {/*<!-- END Overlay Controls !-->*/}
                    </div>
                    {/*<!-- BEGIN Overlay Search Results, This part is for demo purpose, you can add anything you like !-->*/}
                    <div className="container-fluid">
                        <span>
                            <strong>suggestions :</strong>
                        </span>
                        <span id="overlay-suggestions">SEARCH_QUERY</span>
                        <br />

                        <div className="search-results m-t-40">
                            <p className="bold">Pages Search Results</p>

                            <div className="row">
                                <div className="col-md-6">
                                    {/*<!-- BEGIN Search Result Item !-->*/}
                                    <div className="">
                                        {/*<!-- BEGIN Search Result Item Thumbnail !-->*/}
                                        <div
                                            className="thumbnail-wrapper d48 circular bg-success text-white inline m-t-10">
                                            <div>
                                                <img width="50" height="50" src="app/img/profiles/avatar.jpg" alt=""/> {/* data-src="app/img/profiles/avatar.jpg" ui-jq="unveil" data-src-retina="app/img/profiles/avatar2x.jpg"*/}
                                            </div>
                                        </div>
                                        {/*<!-- END Search Result Item Thumbnail !-->*/}
                                        <div className="p-l-10 inline p-t-5">
                                            <h5 className="m-b-5">
                                                <span className="semi-bold result-name">SEARCH_QUERY</span>
                                                on pages
                                            </h5>

                                            <p className="hint-text">via john smith</p>
                                        </div>
                                    </div>
                                    {/*<!-- END Search Result Item !-->*/}
                                    {/*<!-- BEGIN Search Result Item !-->*/}
                                    <div className="">
                                        {/*<!-- BEGIN Search Result Item Thumbnail !-->*/}
                                        <div
                                            className="thumbnail-wrapper d48 circular bg-success text-white inline m-t-10">
                                            <div>T</div>
                                        </div>
                                        {/*<!-- END Search Result Item Thumbnail !-->*/}
                                        <div className="p-l-10 inline p-t-5">
                                            <h5 className="m-b-5">
                                                <span className="semi-bold result-name">SEARCH_QUERY</span>
                                                related
                                                                                   topics
                                            </h5>

                                            <p className="hint-text">via pages</p>
                                        </div>
                                    </div>
                                    {/*<!-- END Search Result Item !-->*/}
                                    {/*<!-- BEGIN Search Result Item !-->*/}
                                    <div className="">
                                        {/*<!-- BEGIN Search Result Item Thumbnail !-->*/}
                                        <div
                                            className="thumbnail-wrapper d48 circular bg-success text-white inline m-t-10">
                                            <div>
                                                <i className="fa fa-headphones large-text "></i>
                                            </div>
                                        </div>
                                        {/*<!-- END Search Result Item Thumbnail !-->*/}
                                        <div className="p-l-10 inline p-t-5">
                                            <h5 className="m-b-5">
                                                <span className="semi-bold result-name">SEARCH_QUERY</span>
                                                music
                                            </h5>

                                            <p className="hint-text">via pagesmix</p>
                                        </div>
                                    </div>
                                    {/*<!-- END Search Result Item !-->*/}
                                </div>
                                <div className="col-md-6">
                                    {/*<!-- BEGIN Search Result Item !-->*/}
                                    <div className="">
                                        {/*<!-- BEGIN Search Result Item Thumbnail !-->*/}
                                        <div
                                            className="thumbnail-wrapper d48 circular bg-info text-white inline m-t-10">
                                            <div>
                                                <i className="fa fa-facebook large-text "></i>
                                            </div>
                                        </div>
                                        {/*<!-- END Search Result Item Thumbnail !-->*/}
                                        <div className="p-l-10 inline p-t-5">
                                            <h5 className="m-b-5">
                                                <span className="semi-bold result-name">SEARCH_QUERY</span>
                                                on
                                                                                   facebook
                                            </h5>

                                            <p className="hint-text">via facebook</p>
                                        </div>
                                    </div>
                                    {/*<!-- END Search Result Item !-->*/}
                                    {/*<!-- BEGIN Search Result Item !-->*/}
                                    <div className="">
                                        {/*<!-- BEGIN Search Result Item Thumbnail !-->*/}
                                        <div
                                            className="thumbnail-wrapper d48 circular bg-complete text-white inline m-t-10">
                                            <div>
                                                <i className="fa fa-twitter large-text "></i>
                                            </div>
                                        </div>
                                        {/*<!-- END Search Result Item Thumbnail !-->*/}
                                        <div className="p-l-10 inline p-t-5">
                                            <h5 className="m-b-5">Tweats on
                                                <span className="semi-bold result-name">SEARCH_QUERY</span>
                                            </h5>

                                            <p className="hint-text">via twitter</p>
                                        </div>
                                    </div>
                                    {/*<!-- END Search Result Item !-->*/}
                                    {/*<!-- BEGIN Search Result Item !-->*/}
                                    <div className="">
                                        {/*<!-- BEGIN Search Result Item Thumbnail !-->*/}
                                        <div
                                            className="thumbnail-wrapper d48 circular text-white bg-danger inline m-t-10">
                                            <div>
                                                <i className="fa fa-google-plus large-text "></i>
                                            </div>
                                        </div>
                                        {/*<!-- END Search Result Item Thumbnail !-->*/}
                                        <div className="p-l-10 inline p-t-5">
                                            <h5 className="m-b-5">Circles on
                                                <span className="semi-bold result-name">SEARCH_QUERY</span>
                                            </h5>

                                            <p className="hint-text">via google plus</p>
                                        </div>
                                    </div>
                                    {/*<!-- END Search Result Item !-->*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<!-- END Overlay Search Results !-->*/}
                </div>
                {/*<!-- END Overlay Content !-->*/}
            </div>
        )
    }
}