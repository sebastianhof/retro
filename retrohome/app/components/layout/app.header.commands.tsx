/// <reference path="../../../typings/react/react.d.ts" />
import * as React from 'react';

export class CommandsHeaderComponent extends React.Component<any, any> {

    render() {

        return (
            <a className="search-link">
                <i className="fa fa-terminal"></i>
                <span>Type anywhere to </span>
                <span className="bold">command</span>
            </a>
        )
    }

}