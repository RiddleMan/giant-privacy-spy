import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default ({ children, isLoading }) => {
    return (
       <div
        style={{
            marginTop: '-36px'
        }}>
            { isLoading && <CircularProgress
                style={{
                    position: 'absolute',
                    left: 0,
                    top: '-6px'
                }}
                size={30}/> }
            {children}
        </div>
    );
};
