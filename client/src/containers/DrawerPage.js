import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleLeftNav } from '../actions/layout';
import { logout } from '../actions/token';
import Drawer from 'material-ui/Drawer';

import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
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
        const { open } = this.props;

        return (
            <Drawer
                docked={false}
                width={300}
                open={open}
                onRequestChange={this.onDrawerClose}>
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
    logout
})(DrawerPage);
