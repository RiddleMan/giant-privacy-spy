import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Tag = (props) => {
    const { isSelected, onToggle, name } = props;

    return (
        <RaisedButton
            className="tag-btn"
            style={{
                margin: 5,
                cursor: 'not-allowed'
            }}
            label={name}
            onTouchTap={() => onToggle(name)}
            primary={isSelected} />
    );
};

export default Tag;
