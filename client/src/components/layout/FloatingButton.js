import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

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
