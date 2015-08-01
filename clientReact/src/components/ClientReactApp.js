'use strict';

import React from 'react/addons';
let ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('../styles/main.scss');

let imageURL = require('../images/yeoman.png');

export default class ClientReactApp extends React.Component {
    render() {
      return (
        <div className="main" onClick={this.handleClick}>
          <ReactTransitionGroup transitionName="fade">
            <img src={imageURL} />
          </ReactTransitionGroup>
        </div>
      );
    }
}
