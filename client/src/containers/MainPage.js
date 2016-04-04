import React, { cloneElement, Component } from 'react';
import { AppBar, AddMenu } from '../components/layout';
import { Map } from '../components/map';
import { fitContainer } from '../utils/styles';
import { connect } from 'react-redux';
import { centerChange } from '../actions/map';
import { goToList } from '../actions/list';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    render() {
        const {
            map: {
                boxes
            },
            onMarkerClick,
            centerChange,
            goToList,
            children,
            location
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { map } = state;

    return {
        map
    };
};

export default connect(mapStateToProps, {
    goToList,
    centerChange
})(MainPage);
