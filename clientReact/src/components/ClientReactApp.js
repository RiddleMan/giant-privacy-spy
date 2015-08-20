'use strict';

import React from 'react/addons';
import { RaisedButton, Styles } from 'material-ui';
let ReactTransitionGroup = React.addons.TransitionGroup;
let ThemeManager = new Styles.ThemeManager();
let Colors = Styles.Colors;

import '../styles/main.scss';
import imageURL from '../images/yeoman.png';

class ClientReactApp extends React.Component {
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
                <RaisedButton label="Default" />
                <h1>Duuuuupa</h1>
                <ReactTransitionGroup transitionName="fade">
                    <img src={imageURL} />
                </ReactTransitionGroup>
            </div>
        );
    }
}
ClientReactApp.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default ClientReactApp;
