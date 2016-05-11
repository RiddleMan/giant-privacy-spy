import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { getFile, filePropChange } from '../actions/file';
import Paper from 'material-ui/Paper';
import { FileCarousel, FileInfo } from '../components/layout';

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
        const { content, isFetching, filePropChange } = this.props;

        return (
            <Paper className='file-page__overlay'>
                <FileCarousel
                    isFetching={isFetching}
                    onNext={this.onNext}
                    onPrev={this.onPrev}
                    file={content}/>
                <FileInfo
                    onChange={filePropChange}
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
    filePropChange,
    getFile,
    goToFile: (id) => routeActions.push(`/file/${id}`)
})(FilePage);
