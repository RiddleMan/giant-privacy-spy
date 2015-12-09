import React, { Component } from 'react';

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
