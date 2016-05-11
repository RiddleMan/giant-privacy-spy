import React, { Component } from 'react';
import { getFileUrl } from '../../utils/api';
import { getImageSize } from '../../utils/files';
import { findDOMNode } from 'react-dom';
import Paper from 'material-ui/Paper';

class ImagePreview extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onWidthChange = this.onWidthChange.bind(this);
        this.onImgLoad = this.onImgLoad.bind(this);
    }

    onImgLoad() {
        const { file } = this.props;

        let url;
        if(file.thumbnails)
            url = getFileUrl(file.thumbnails[1920]);

        getImageSize(url)
            .then((dim) => {
                this.imgDim = dim;
                this.onWidthChange();
            });
    }

    get isMatchingMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    onWidthChange() {
        if(!this.imgDim)
            return;

        const thisEl = findDOMNode(this);

        window.requestAnimationFrame(() => {
            const parentDim = {
                width: thisEl.parentElement.clientWidth,
                height: thisEl.parentElement.clientHeight
            };

            const factorX = this.imgDim.width / (parentDim.width - 80);
            const factorY = this.imgDim.height / (parentDim.height - 80);

            const factor = this.isMatchingMobile ? factorX : Math.max(factorX, factorY);

            this.setState({
                width: `${this.imgDim.width / factor}px`,
                height: `${this.imgDim.height / factor}px`
            });
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWidthChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWidthChange);
    }

    render() {
        const { file, isFetching } = this.props;
        const { width, height } = this.state;

        let url;

        if(file.thumbnails)
            url = getFileUrl(file.thumbnails[1920]);

        return (
            <Paper
                className='image-preview'
                style={{
                    width,
                    height
                }}
                zDepth={2}>
                <picture>
                {/*<source
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
                    media="(-webkit-min-device-pixel-ratio: 1.5),(min-resolution: 144dpi)" />*/}
                    <img
                        ref={(r) => this.img = r}
                        onLoad={this.onImgLoad}
                        className='fit'
                        src={url} />
                </picture>
            </Paper>
        );
    }
}

export default ImagePreview;
