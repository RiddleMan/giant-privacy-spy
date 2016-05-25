import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionWatchLater from 'material-ui/svg-icons/action/watch-later';
import Image from 'material-ui/svg-icons/image/image';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import { MapLoader } from '../map';
import { GoogleMap, Marker } from 'react-google-maps';
import AutoComplete from 'material-ui/AutoComplete';
import { getAllTags } from '../../utils/api';
import Tag from './Tag';

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
        this.onNameChange = this.onNameChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onTagAddition = this.onTagAddition.bind(this);
        this.onTagDelete = this.onTagDelete.bind(this);
        this.onUserType = this.onUserType.bind(this);

        this.state = {
            tagsDelete: {},
            tags: [],
            searchText: ''
        };
    }

    onUserType(searchText) {
        this.setState({
            searchText
        });
    }

    componentDidMount() {
        getAllTags(this.context.store.getState().token)
            .then((tags) =>
                this.setState({
                    tags
                }));
    }

    onPositionChange(loc) {
        this.props.onChange({
            _loc: loc
        });
    }

    onNameChange(e) {
        this.props.onChange({
            name: e.target.innerText
        });
    }

    onDateChange(x, date) {
        this.props.onChange({
            _createDate: date.toISOString()
        });
    }

    onTagDeleteTimeout(name) {
        const { tagsDelete } = this.props;

        const tId = setTimeout(() => {
            let res = {
                ...tagsDelete
            };

            delete res[name];

            this.setState({
                tagsDelete: res
            });
        }, 2 * 1000);

        return {
            cancel: () => clearTimeout(tId)
        };
    }

    onTagDelete(name) {
        const { file } = this.props;
        const { tagsDelete } = this.state;

        if(name in tagsDelete) {
            tagsDelete[name].cancel();

            const newDelete = {
                ...tagsDelete
            };

            delete newDelete[name];

            this.setState({
                tagsDelete: newDelete
            });

            this.props.onChange({
                tags: file.tags
                    .slice()
                    .filter((t) => t !== name)
            });

            return;
        }

        this.setState({
            tagsDelete: {
                ...tagsDelete,
                [name]: this.onTagDeleteTimeout(name)
            }
        });
    }

    onTagAddition(tagToAdd) {
        const { file } = this.props;
        const { tags } = this.state;

        const newTags = file.tags.slice();
        const newAllTags = tags.slice();

        if(newTags.indexOf(tagToAdd) === -1) {
            newTags.push(tagToAdd);

            this.props.onChange({
                tags: newTags
            });
        }

        if(newAllTags.indexOf(tagToAdd) === -1) {
            newAllTags.push(tagToAdd);

            this.setState({
                tags: newAllTags
            });
        }

        this.setState({
            searchText: ''
        });
    }

    renderName() {
        const { file } = this.props;

        return (
            <div
                contentEditable
                onBlur={this.onNameChange}
                dangerouslySetInnerHTML={{__html: file.name}} />
        );
    }

    renderDate() {
        const { file } = this.props;

        return (
            <DatePicker
                style={{
                    height: '40px'
                }}
                id="fileInfo-datePicker"
                onChange={this.onDateChange}
                value={new Date(file._createDate)}
                container="inline" />
        );
    }

    get tagsForAutocomplete() {
        const { file } = this.props;
        const { tags } = this.state;

        return tags.filter((t) => file.tags.indexOf(t) === -1);
    }

    render() {
        const { file } = this.props;

        const inputStyle = {
            marginLeft: '20px',
            marginTop: '4px',
            width: 'calc(100% - 40px)'
        };

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
                        secondaryText={this.renderName()}
                    />
                    <ListItem
                        leftIcon={<ActionWatchLater />}
                        primaryText="Created"
                        secondaryText={this.renderDate()} />
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
                {file.tags.map((tag) =>
                    <Tag
                        key={tag}
                        name={tag}
                        onToggle={this.onTagDelete}
                        isSelected={tag in this.state.tagsDelete} />
                )}
                <AutoComplete
                    fullWidth
                    style={inputStyle}
                    hintText="Tag"
                    onNewRequest={this.onTagAddition}
                    filter={AutoComplete.noFilter}
                    onUpdateInput={this.onUserType}
                    searchText={this.state.searchText}
                    dataSource={this.tagsForAutocomplete} />
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

FileInfo.contextTypes = {
    store: PropTypes.object
};

export default FileInfo;
