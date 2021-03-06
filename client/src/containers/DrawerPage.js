import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleLeftNav } from '../actions/layout';
import { logout } from '../actions/token';
import { clear as clearFilters } from '../actions/list';
import { goToMap } from '../actions/map';
import Drawer from 'material-ui/Drawer';

import { List, ListItem } from 'material-ui/List';
import Map from 'material-ui/svg-icons/maps/map';
import Divider from 'material-ui/Divider';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import UserInfoCard from './UserInfoCard';


class DrawerPage extends Component {
    constructor(props) {
        super(props);

        this.onDrawerClose = this.onDrawerClose.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout('');
    }

    onDrawerClose(open) {
        this.props.toggleLeftNav(open);
    }

    render() {
        const { open, goToMap, clearFilters } = this.props;

        return (
            <Drawer
                docked={false}
                width={300}
                open={open}
                onRequestChange={this.onDrawerClose}>
                <UserInfoCard />
                    <List>
                        <ListItem
                            onTouchTap={() => {
                                goToMap();
                                clearFilters();
                                this.onDrawerClose();
                            }}
                            primaryText="Map"
                            leftIcon={<Map />} />
                    </List>
                <Divider />
                <List>
                  <ListItem
                    onTouchTap={this.onLogout}
                    primaryText="Logout"
                    rightIcon={<ExitToApp />} />
                </List>
            </Drawer>
        );
    }
}

DrawerPage.propTypes = {
    open: PropTypes.bool
};

DrawerPage.defaultProps = {
    open: false
};

const mapStateToProps = (state) => {
    const { layout: {
        leftNav
    }} = state;

    return {
        open: leftNav
    };
};

export default connect(mapStateToProps, {
    toggleLeftNav,
    goToMap,
    clearFilters,
    logout
})(DrawerPage);
