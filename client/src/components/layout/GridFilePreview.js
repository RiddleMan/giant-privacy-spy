import React, { PureComponent } from 'react';
import { GridTile } from 'material-ui/GridList';
import { getFileUrl } from '../../utils/api';
import moment from 'moment';
import DownloadButton from './DownloadButton';

const TimeDescriptor = (props) => {
    const { date } = props;
    return (
        <span>at <b>{moment(date).format('LLL')}</b></span>
    );
};

const ImagePreview = (props) => {
    const { name, fileId, thumbnails, createDate, onSelect, file } = props;
    const fileUrl = getFileUrl(fileId);

    return (
        <GridTile
            onTouchTap={() => onSelect(file)}
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
    const { name, fileId, createDate, onSelect, file } = props;
    const fileUrl = getFileUrl(fileId);

    return (
        <GridTile
            onTouchTap={() => onSelect(file)}
            title={name}
            subtitle={<TimeDescriptor date={createDate} />}
            actionIcon={<DownloadButton name={name} url={fileUrl} />}>
            {/*<img src={fileUrl} />*/}
        </GridTile>
    );
};

class FilePreview extends PureComponent {
    render() {
        const { mimeType } = this.props;

        if(mimeType.startsWith('image'))
            return <ImagePreview {...this.props} />;

        return <GenericPreview {...this.props}/>;
    }
}

export default FilePreview;
