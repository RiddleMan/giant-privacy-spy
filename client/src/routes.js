import React, { Component } from 'react';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import Router, { Route } from 'react-router';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Route component={ App }>
                    <Route path="/login" component={ LoginPage } />
                </Route>
            </Router>
        );
    }
}
