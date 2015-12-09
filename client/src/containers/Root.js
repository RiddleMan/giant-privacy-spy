import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Routes from '../routes';
const store = configureStore();
let LogMonitor;
let DevTools;
let DebugPanel;

if(__DEV__ && __DEVTOOLS__) {
    let dev = require('redux-devtools/lib/react');
    LogMonitor = dev.LogMonitor;
    DevTools = dev.DevTools;
    DebugPanel = dev.DebugPanel;
}

class Root extends Component {
    render() {
        return (
            <div className="sc-app">
                <Provider store={store}>
                    <Routes />
                </Provider>
                {__DEV__ && __DEVTOOLS__ ? <DebugPanel right top bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel> : <div />}
            </div>
        );
    }
}

export default Root;
