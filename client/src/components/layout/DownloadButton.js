import React from 'react';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import IconButton from 'material-ui/IconButton';

export default (props) => {
    const { name, url } = props;
    const onDownload = () => {
        const aEl = document.createElement('a');
        aEl.href = url;
        aEl.download = name;
        aEl.click();
    };

    return (
        <IconButton onTouchTap={onDownload}>
            <FileDownload color="white"/>
        </IconButton>
    );
};
