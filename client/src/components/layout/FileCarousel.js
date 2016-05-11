import React, { Component } from 'react';
import FilePreview from './FilePreview';
import IconButton from 'material-ui/IconButton';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class CarouselControls extends Component {
    render() {
        const {
            onLeftTouchTap,
            onRightTouchTap,
            rightDisabled,
            leftDisabled
        } = this.props;

        return (
            <div className='file-preview__controls'>
                <div className='file-preview__controls-container'>
                    <IconButton
                        disabled={leftDisabled}
                        onTouchTap={onLeftTouchTap}>
                        <LeftArrow />
                    </IconButton>
                    <IconButton
                        disabled={rightDisabled}
                        onTouchTap={onRightTouchTap}>
                        <RightArrow />
                    </IconButton>
                </div>
            </div>
        );
    }
}

class Carousel extends Component {
    render() {
        const { file: {
            prev, next
        }, onPrev, onNext, isFetching } = this.props;
        const file = this.props.file;

        return (
            <div className='file-preview'>
                <div className='file-preview__content'>
                    <FilePreview
                        file={file} />
                </div>
                <CarouselControls
                    rightDisabled={!next || isFetching}
                    leftDisabled={!prev || isFetching}
                    onLeftTouchTap={onPrev}
                    onRightTouchTap={onNext}/>
            </div>
        );
    }
}

export default Carousel;
