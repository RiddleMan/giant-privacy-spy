import React from 'react';
import { RouteHandler } from 'react-router';

class Authenticated extends React.Component {
    static willTransitionTo(transition) {
        if(window.localStorage.getItem('is-auth') !== 'true') {
            transition.redirect('/', {});// eslint-disable-line
        }
    }

    render() {
        return (
            <div>
                <h1>Authgfhgfhgfghf View</h1>
                <div>hgfhfhjfjhfjhgjh</div>
                <RouteHandler/>
            </div>
        );
    }
}

export default Authenticated;
