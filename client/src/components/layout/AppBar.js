import React from 'react';
import AppBarMUI from 'material-ui/lib/app-bar';

export const AppBar = (props) => {
    const { title } = props;

    return (
        <AppBarMUI
            title={title} />
    );
};
