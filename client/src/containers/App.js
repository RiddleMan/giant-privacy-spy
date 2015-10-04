import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div className="sc-app">
                {this.props.children}
            </div>
        );
    }
}

export default App;
