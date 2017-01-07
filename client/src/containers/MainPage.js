import React, { Component } from 'react';
import { AppBar, AddMenu, MainPageFilters } from '../components/layout';
import { Map } from '../components/map';
import { fitContainer } from '../utils/styles';
import { connect } from 'react-redux';
import { centerChange } from '../actions/map';
import { goToList } from '../actions/list';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Snackbar from 'material-ui/Snackbar';
import { hide } from '../actions/upload';
import { toggleLeftNav } from '../actions/layout';
import DrawerPage from './DrawerPage';

const pageSettings = {
    appBarHeight: '64px'
};

const LowerContainer = (props) => {
    const { children } = props;

    const styles = {
        position: 'relative',
        height: `calc(100% - ${pageSettings.appBarHeight})`,
        display: 'flex'
    };

    return (
        <div style={styles}>
            {children}
        </div>
    );
};

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.onSnackClose = this.onSnackClose.bind(this);
        this.onDrawerOpen = this.onDrawerOpen.bind(this);
    }

    onDrawerOpen() {
        this.props.toggleLeftNav(true);
    }

    onSnackClose() {
        const { hide } = this.props;
        hide();
    }

    render() {
        const {
            map: {
                boxes
            },
            centerChange,
            goToList,
            children,
            isOpen
        } = this.props;

        return (
            <div
                style={fitContainer()}>
                <AppBar
                    title="G.P.S."
                    onLeftIconButtonTouchTap={this.onDrawerOpen} />
                <LowerContainer>
                    <Map
                        onMarkerClick={goToList}
                        onCenterChange={centerChange}
                        boxes={boxes} />
                    <MainPageFilters />
                    <AddMenu />
                    {children}
                </LowerContainer>
                <DrawerPage />
                <Snackbar
                    open={isOpen}
                    message="File(s) uploaded successfully"
                    autoHideDuration={3000}
                    onRequestClose={this.onSnackClose} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { map, upload: {
        isOpen
    }, layout: {
        leftNav
    } } = state;

    return {
        map,
        isOpen,
        leftNav
    };
};

export default connect(mapStateToProps, {
    hide,
    goToList,
    centerChange,
    toggleLeftNav
})(MainPage);
