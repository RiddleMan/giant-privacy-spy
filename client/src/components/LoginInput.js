import React from 'react';
import TextField from 'material-ui/TextField';

export default (props) => {
    const fieldStyle = {
        width: '100%'
    };

    const { label } = props;

    return (
        <TextField
            style={fieldStyle}
            floatingLabelText={label}
            {...props}/>
    );
};
