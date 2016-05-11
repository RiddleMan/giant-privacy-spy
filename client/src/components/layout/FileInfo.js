import React, { Component } from 'react';
import moment from 'moment';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionWatchLater from 'material-ui/svg-icons/action/watch-later';
import Image from 'material-ui/svg-icons/image/image';
import Paper from 'material-ui/Paper';
import { MapLoader } from '../map';
import { GoogleMap, Marker } from 'react-google-maps';

class Minimap extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange([e.latLng.lng(), e.latLng.lat()]);
    }

    render() {
        const { coords } = this.props;

        const pos = {
            lat: coords[1],
            lng: coords[0]
        };

        return (
            <MapLoader
                style={{
                    height: '200px',
                    width: '100%'
                }}>
                <GoogleMap
                    defaultZoom={12}
                    center={pos}>
                    <Marker
                        onDragend={this.onChange}
                        draggable={true}
                        position={pos}
                        defaultAnimation={2} />
                </GoogleMap>
            </MapLoader>
        );
    }
}

class FileInfo extends Component {
    constructor(props) {
        super(props);

        this.onPositionChange = this.onPositionChange.bind(this);
    }

    onPositionChange(loc) {
        this.props.onChange({
            _loc: loc
        });
    }

    render() {
        const { file } = this.props;

        if(!file._createDate)
            return null;

        return (
            <Paper
                zDepth={4}
                className="file-info">
                <Minimap
                    onChange={this.onPositionChange}
                    coords={file._loc.coordinates} />
                <List>
                    <ListItem
                        leftIcon={<Image />}
                        primaryText="Name"
                        secondaryText={file.name}
                    />
                    <ListItem
                        leftIcon={<ActionWatchLater />}
                        primaryText="Created"
                        secondaryText={moment(file._createDate).format('LLL')} />
                    <ListItem
                        leftIcon={<ActionInfo />}
                        primaryText="Details"
                        nestedItems={[
                            <ListItem
                                leftIcon={<Image />}
                                primaryText="Name"
                                secondaryText={file.name}
                            />,
                            <ListItem
                                leftIcon={<ActionWatchLater />}
                                primaryText="Created"
                                secondaryText={moment(file._createDate).format('LLL')} />
                        ]} />
                </List>
                {/*Temporary*/}
                {/*<UserInfoCard />
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
                </List>*/}
            </Paper>
        );
    }
}

export default FileInfo;
