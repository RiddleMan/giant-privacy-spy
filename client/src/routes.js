import React, { Component } from 'react';
import { App, MainPage } from './containers';
import Router, { Route } from 'react-router';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Route component={ App }>
                    {/*<Route component={ SignedPage }>
                        <Route path="/" component={ MainPage } />
                    </Route>
                    <Route path="/login" component={ LoginPage } />*/
                    }
                    <Route path="/" component={ MainPage } />
                </Route>
            </Router>
        );
    }
}
