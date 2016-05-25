import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Tag = (props) => {
    const { isSelected, onToggle, name } = props;

    return (
        <RaisedButton
            style={{
                margin: 5
            }}
            label={name}
            onTouchTap={() => onToggle(name)}
            primary={isSelected} />
    );
};

export default Tag;
