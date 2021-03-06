import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { GridList } from 'material-ui/GridList';
import { GridFilePreview } from '../components/layout';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { clear, getNextUnboxed, setGeoHash } from '../actions/list';
import { findDOMNode } from 'react-dom';
import CircularProgress from 'material-ui/CircularProgress';

/* eslint-disable */
const styles = {
  gridList: {
    overflowY: 'scroll'
  },
};
/* eslint-enable */

class FileListPage extends Component {
    constructor(props) {
        super(props);

        this.onResize = this.onResize.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.state = {
            columnsCount: this.noOfColumns
        };
        this.onFileSelect = this.onFileSelect.bind(this);
    }

    onFileSelect(file) {
        this.props.goToFile(file._id);
    }

    onScroll() {
        const { getNextUnboxed } = this.props;

        if(this.scroller.scrollTop + this.scroller.offsetHeight >= this.scroller.scrollHeight - 50)
            getNextUnboxed();
    }

    onResize() {
        if(this.state.columnsCount !== this.noOfColumns)
            this.setState({
                columnsCount: this.noOfColumns
            });
    }

    get noOfColumns() {
        if(window.matchMedia('(min-width: 1200px)').matches)
            return 5;

        if(window.matchMedia('(min-width: 768px)').matches)
            return 4;

        if(window.matchMedia('(min-width: 480px)').matches)
            return 3;

        return 2;
    }

    componentDidMount() {
        const { setGeoHash, params: { id }, getNextUnboxed } = this.props;
        setGeoHash(id);
        getNextUnboxed();
        window.addEventListener('resize', this.onResize);
        this.scroller.addEventListener('wheel', this.onScroll);
    }

    componentWillUpdate(nextProps) {
        if(nextProps.params.id !== this.props.params.id) {
            const { setGeoHash, clear, getNextUnboxed } = this.props;
            const { params: { id } } = nextProps;

            clear();
            setGeoHash(id);
            getNextUnboxed();
        }
    }

    componentWillUnmount() {
        const { clear } = this.props;
        clear();

        window.removeEventListener('resize', this.onResize);
        if(this.scroller)
            this.scroller.removeEventListener('wheel', this.onScroll);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.list.isFetching !== nextProps.list.isFetching ||
            this.props.list.files !== nextProps.list.files
            || this.props.params.id !== nextProps.params.id;
    }

    render() {
        const { list } = this.props;
        const { isFetching } = list;
        const { columnsCount } = this.state;

        return (
            <Paper className='mainPage__overlay'>
                <GridList
                    ref={(r) => this.scroller = findDOMNode(r)}
                    cols={columnsCount}
                    cellHeight={200}
                    style={styles.gridList}>
                    {list.files.map(file =>
                        <GridFilePreview
                            onSelect={this.onFileSelect}
                            key={file.fileId}
                            file={file}
                            {...file}/>)}
                </GridList>
                { isFetching && <CircularProgress
                    style={{
                        position: 'fixed',
                        bottom: 10,
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                    size={50}/> }
            </Paper>);
    }
}

const mapStateToProps = (state) => {
    const { list } = state;
    return {
        list
    };
};

export default connect(mapStateToProps, {
    setGeoHash,
    getNextUnboxed,
    clear,
    goToFile: (fileId) => routeActions.push(`/file/${fileId}`)
})(FileListPage);
