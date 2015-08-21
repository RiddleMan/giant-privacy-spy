import React from 'react';
import { RouteHandler } from 'react-router';

class Authenticated extends React.Component {
    static willTransitionFrom() {
        console.log('asdfasdf'); // eslint-disable-line
    }

    static willTransitionTo(transition) {
        if(window.localStorage.getItem('is-auth') !== 'true') {
            transition.redirect('/', {});// eslint-disable-line
        }
    }

    render() {
        return (
            <div>
                <h1>Authenticated View</h1>
                <RouteHandler/>
            </div>
        );
    }
}

export default Authenticated;
