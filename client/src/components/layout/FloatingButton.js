import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

export default class FloatingButton extends Component {
    render() {
        const { isLoading, ...rest } = this.props;

        return (
            <FloatingActionButton {...rest}>
                {isLoading ? <CircularProgress size={40} /> : <Add />}
            </FloatingActionButton>
        );
    }
}
