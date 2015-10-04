import React, { Component } from 'react';
import { App, SignedPage, MainPage, LoginPage } from './containers';
import Router, { Route } from 'react-router';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Route component={ App }>
                    <Route component={ SignedPage }>
                        <Route path="/" component={ MainPage } />
                    </Route>
                    <Route path="/login" component={ LoginPage } />
                </Route>
            </Router>
        );
    }
}
