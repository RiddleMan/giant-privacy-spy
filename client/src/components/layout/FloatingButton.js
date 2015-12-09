import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Add from 'material-ui/lib/svg-icons/content/add';

export const FloatingButton = (props) => {
    return (
        <FloatingActionButton {...props}
            style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px'
            }}>
          <Add />
        </FloatingActionButton>
    );
};
