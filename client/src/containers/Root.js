import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Routes from '../routes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

let DevTools;

if(__DEV__ && __DEVTOOLS__) {
    DevTools = require('./DevTools').default;
}

class Root extends Component {
    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        };
    }

    render() {
        const { store } = this.props;

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

Root.childContextTypes = {
    muiTheme: PropTypes.object.isRequired
};

export default Root;
