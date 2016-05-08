import React, { Component, PropTypes } from 'react';
import { GridTile } from 'material-ui/GridList';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import IconButton from 'material-ui/IconButton';
import { getFileUrl } from '../../utils/api';
import moment from 'moment';
import pureRender from '../../utils/pureRender';

const DownloadButton = (props) => {
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

const TimeDescriptor = (props) => {
    const { date } = props;
    return (
        <span>at <b>{moment(date).format('LLL')}</b></span>
    );
};

const ImagePreview = (props) => {
    const { name, fileId, thumbnails, createDate, onSelect } = props;
    const fileUrl = getFileUrl(fileId);

    return (
        <GridTile
            onTouchTap={onSelect}
            title={name}
            subtitle={<TimeDescriptor date={createDate} />}
            actionIcon={<DownloadButton name={name} url={fileUrl} />}>
            <picture>
                <source
                    alt={name}
                    srcSet={getFileUrl(thumbnails['500'])}
                    media="(-webkit-min-device-pixel-ratio: 1.25),(min-resolution: 120dpi)" />
                <source
                    alt={name}
                    srcSet={getFileUrl(thumbnails['500'])}
                    media="(-webkit-min-device-pixel-ratio: 1.3),(min-resolution: 124.8dpi)" />
                <source
                    alt={name}
                    srcSet={getFileUrl(thumbnails['800'])}
                    media="(-webkit-min-device-pixel-ratio: 1.5),(min-resolution: 144dpi)" />
                <img
                    src={getFileUrl(thumbnails['200'])}
                    alt={name} />
            </picture>
        </GridTile>
    );
};

const GenericPreview = (props) => {
    const { name, fileId, createDate } = props;
    const fileUrl = getFileUrl(fileId);

    return (
        <GridTile
            title={name}
            subtitle={<TimeDescriptor date={createDate} />}
            actionIcon={<DownloadButton name={name} url={fileUrl} />}>
            {/*<img src={fileUrl} />*/}
        </GridTile>
    );
};

class FilePreview extends Component {
    render() {
        const { mimeType } = this.props;

        if(mimeType.startsWith('image'))
            return <ImagePreview {...this.props} />;

        return <GenericPreview {...this.props}/>;
    }
}

export default pureRender(FilePreview);
