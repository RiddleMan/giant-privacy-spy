import React, { Component } from 'react';

class SignedPage extends Component {
    render() {
        return (<div><h1>SignedPage</h1>{this.props.children}</div>);
    }
}

export default SignedPage;
