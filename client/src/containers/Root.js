import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Routes from '../routes';
const store = configureStore();
let DevTools;

if(__DEV__ && __DEVTOOLS__) {
    DevTools = require('./DevTools').default;
}

class Root extends Component {
    render() {
        return (
            <div className="sc-app">
                <Provider store={store}>
                    <div className="sc-app">
                        <Routes />
                        {__DEV__ && __DEVTOOLS__ ? <DevTools /> : <div />}
                    </div>
                </Provider>
            </div>
        );
    }
}

export default Root;