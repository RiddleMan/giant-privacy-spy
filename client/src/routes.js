import React, { Component, PropTypes } from 'react';
import { App, MainPage, LoginPage, FileListPage, FilePage } from './containers';
import { Router, Route, browserHistory } from 'react-router';

class Routes extends Component {
    constructor(props) {
        super(props);

        this.isAuthorized = this.isAuthorized.bind(this);
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

    render() {
        return (
            <Router history={browserHistory}>
                <Route component={ App }>
                    <Route path="/login" component={ LoginPage } />
                    <Route path="/" component={ MainPage } onEnter={this.isAuthorized}>
                        <Route path="/file/:id" component={ FilePage }/>
                        <Route path="/list/:id" component={ FileListPage }/>
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
