import React from 'react';
import AppBarMUI from 'material-ui/AppBar';

export const AppBar = (props) => {
    const { title } = props;

    return (
        <AppBarMUI
            title={title}
            {...props}/>
    );
};
