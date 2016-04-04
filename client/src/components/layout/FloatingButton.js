import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Add from 'material-ui/lib/svg-icons/content/add';

export default class FloatingButton extends Component {
    render() {
        return (
            <FloatingActionButton {...this.props}>
                <Add />
            </FloatingActionButton>
        );
    }
}
