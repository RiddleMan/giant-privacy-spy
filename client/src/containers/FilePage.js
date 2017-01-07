import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { getFile, filePropChange, removeFile } from '../actions/file';
import Paper from 'material-ui/Paper';
import { FileCarousel, FileInfo, DownloadButton } from '../components/layout';
import { getFileUrl } from '../utils/api';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

class FilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onFileRemove = this.onFileRemove.bind(this);
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

    onFileRemove() {
        this.props.removeFile();
    }

    render() {
        const {
            content,
            isFetching,
            filePropChange
        } = this.props;
        const fileUrl = getFileUrl(content.fileId);

        return (
            <Paper className='file-page__overlay'>
                <FileCarousel
                    isFetching={isFetching}
                    onNext={this.onNext}
                    onPrev={this.onPrev}
                    file={content}/>
                <Paper
                    zDepth={4}
                    className='file-page__content'>
                    <FileInfo
                        onChange={filePropChange}
                        file={content} />
                    <div className="file-page__actions">
                        <DownloadButton
                            name={content.name} url={fileUrl} />
                        <IconButton
                            onTouchTap={this.onFileRemove}>
                            <DeleteIcon color='white' />
                        </IconButton>
                    </div>
                </Paper>
            </Paper>);
    }
}


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
    filePropChange,
    removeFile,
    getFile,
    goToFile: (id) => routeActions.replace(`/file/${id}`)
})(FilePage);
