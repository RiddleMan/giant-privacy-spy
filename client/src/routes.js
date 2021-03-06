import React, { Component, PropTypes } from 'react';
import {
    App,
    MainPage,
    LoginPage,
    FileListPage,
    FilePage,
    RegisterPage
} from './containers';
import { clear } from './actions/map';
import { Router, Route, hashHistory } from 'react-router';

class Routes extends Component {
    constructor(props) {
        super(props);

        this.isAuthorized = this.isAuthorized.bind(this);
        this.onMapLeave = this.onMapLeave.bind(this);
    }

    isAuthorized(nextState, replace) {
        const state = this.context.store.getState();

        if(!state.token) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    }

    onMapLeave() {
        const store = this.context.store;

        store.dispatch(clear());
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route component={ App }>
                    <Route
                        path="/login"
                        component={ LoginPage } />
                    <Route
                        path="/register"
                        component={ RegisterPage } />
                    <Route
                        path="/"
                        component={ MainPage }
                        onLeave={this.onMapLeave}
                        onEnter={this.isAuthorized}>
                        <Route path="/file/:id" component={ FilePage }/>
                        <Route
                            path="/list/:id"
                            component={ FileListPage }/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

Routes.contextTypes = {
    store: PropTypes.object
};

export default Routes;
