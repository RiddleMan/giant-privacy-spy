import React, { Component, PropTypes } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class FileListToolbar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <TextField
                        style={{
                            marginLeft: '20px',
                            marginTop: '4px'
                        }}
                        hintText="Search" />
                </ToolbarGroup>

                <ToolbarGroup>
                    <RaisedButton label="Create Broadcast" primary={true} />
                    <IconMenu
                        iconButtonElement={
                            <IconButton touch={true}>
                            <NavigationExpandMoreIcon />
                            </IconButton>
                        }>
                        <MenuItem primaryText="Download" />
                        <MenuItem primaryText="More Info" />
                    </IconMenu>
                </ToolbarGroup>

            </Toolbar>
        );
    }
}

FileListToolbar.propTypes = {

};

FileListToolbar.defaultProps = {

};

export default FileListToolbar;
