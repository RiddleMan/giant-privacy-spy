'use strict';

import React from 'react/addons';
import { Styles } from 'material-ui';
import { Link, RouteHandler } from 'react-router';
let ThemeManager = new Styles.ThemeManager();
let Colors = Styles.Colors;

import '../styles/main.scss';

class App extends React.Component {
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    componentWillMount() {
        ThemeManager.setPalette({
            accent1Color: Colors.deepOrange500
        });
    }

    render() {
        return (
            <div className="main" onClick={this.handleClick}>
                <Link to="/main">Login</Link>
                <Link to="/main/index">Login</Link>
                <RouteHandler />
            </div>
        );
    }
}
App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App;
