import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Add from 'material-ui/lib/svg-icons/content/add';
import CircularProgress from 'material-ui/lib/circular-progress';

export default class FloatingButton extends Component {
    render() {
        const { isLoading } = this.props;

        return (
            <FloatingActionButton {...this.props}>
                {isLoading ? <CircularProgress size={0.5} /> : <Add />}
            </FloatingActionButton>
        );
    }
}
