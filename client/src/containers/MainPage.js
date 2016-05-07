import React, { cloneElement, Component } from 'react';
import { AppBar, AddMenu } from '../components/layout';
import { Map } from '../components/map';
import { fitContainer } from '../utils/styles';
import { connect } from 'react-redux';
import { centerChange } from '../actions/map';
import { goToList } from '../actions/list';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Snackbar from 'material-ui/Snackbar';
import { hide } from '../actions/upload';
import Drawer from 'material-ui/Drawer';

const pageSettings = {
    appBarHeight: '64px'
};

const LowerContainer = (props) => {
    const { children } = props;

    const styles = {
        position: 'relative',
        height: `calc(100% - ${pageSettings.appBarHeight})`
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

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        const { hide } = this.props;
        hide();
    }

    render() {
        const {
            map: {
                boxes
            },
            onMarkerClick,
            centerChange,
            goToList,
            children,
            location,
            isOpen
        } = this.props;

        return (
            <div
                style={fitContainer()}>
                <AppBar title="G.P.S." />
                <LowerContainer>
                    <Map
                        onMarkerClick={goToList}
                        onCenterChange={centerChange}
                        boxes={boxes} />
                    <AddMenu />
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="slide"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        style={{
                            zIndex: 3
                        }}>
                        {cloneElement(children || <div />, {
                            key: location.pathname
                        })}
                    </ReactCSSTransitionGroup>
                </LowerContainer>
                {/*<Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={open => this.setState({open})}>
                </Drawer>*/}
                <Snackbar
                    open={isOpen}
                    message="File(s) uploaded successfully"
                    autoHideDuration={3000}
                    onRequestClose={this.onClose} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { map, upload: {
        isOpen
    } } = state;

    return {
        map,
        isOpen
    };
};

export default connect(mapStateToProps, {
    hide,
    goToList,
    centerChange
})(MainPage);
