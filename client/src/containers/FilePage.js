import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { findDOMNode } from 'react-dom';
import { getFile } from '../actions/file';
import { getFileUrl } from '../utils/api';

import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import UserInfoCard from './UserInfoCard';

import IconButton from 'material-ui/IconButton';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class FileInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { file } = this.props;

        return (
            <Paper
                zDepth={4}
                className="file-info">
                {/*Temporary*/}
                <UserInfoCard />
                <List>
                  <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                  <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                  <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                  <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                  <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                </List>
                <Divider />
                <List>
                  <ListItem
                    onTouchTap={this.onLogout}
                    primaryText="Logout"
                    rightIcon={<ExitToApp />} />
                </List>
            </Paper>
        );
    }
}

class ImagePreview extends Component {
    render() {
        const { file, isFetching } = this.props;

        let url;

        if(file.thumbnails)
            url = getFileUrl(file.thumbnails[1920]);

        return (
            <Paper
                style={{
                    maxWidth: 'calc(100% - 40px)',
                    margin: '0 auto'
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
                        className='fit'
                        src={url} />
                </picture>
            </Paper>
        );
    }
}

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
                    <ImagePreview
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

class FilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    onPrev() {
        const { content: {
            prev
        }, goToFile } = this.props;

        goToFile(prev);
    }

    onNext() {
        const { content: {
            next
        }, goToFile } = this.props;

        goToFile(next);
    }

    getNewFile(props) {
        const { params: {
            id
        }, getFile } = props;

        getFile(id);
    }

    componentDidMount() {
        this.getNewFile(this.props);
    }

    componentWillUpdate(nextProps) {
        if(nextProps.params.id !== this.props.params.id)
            this.getNewFile(nextProps);
    }

    render() {
        const { content, isFetching } = this.props;

        return (
            <Paper className='file-page__overlay'>
                <Carousel
                    isFetching={isFetching}
                    onNext={this.onNext}
                    onPrev={this.onPrev}
                    file={content}/>
                <FileInfo
                    file={content} />
            </Paper>);
    }
}

const noop = () => {};

FilePage.defaultProps = {
    content: {}
};

const mapStateToProps = (state) => {
    const { file } = state;

    return {
        ...file
    };
};

export default connect(mapStateToProps, {
    getFile,
    goToFile: (id) => routeActions.push(`/file/${id}`)
})(FilePage);
