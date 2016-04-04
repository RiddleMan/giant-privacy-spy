import React, { Component } from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FloatingButton from './FloatingButton';
import Map from 'material-ui/lib/svg-icons/maps/map';
import Place from 'material-ui/lib/svg-icons/maps/place';
import { fileOpen } from '../../utils/files';
import { connect } from 'react-redux';
import { uploadFile, uploadTrack } from '../../actions/upload';

class AddMenu extends Component {
    constructor(props) {
        super(props);

        this.onFileUpload = this.onFileUpload.bind(this);
        this.onTrackUpload = this.onTrackUpload.bind(this);
    }

    onFileUpload() {
        const { uploadFile } = this.props;

        fileOpen()
            .then((files) => {
                Array.from(files)
                    .forEach(uploadFile);
            });
    }

    onTrackUpload() {
        const { uploadTrack } = this.props;

        fileOpen('.json')
            .then((files) => {
                const file = files[0];
                if(file)
                    uploadTrack(file);
            });
    }

    render() {
        return (
            <IconMenu
            style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px'
            }}
            iconButtonElement={<FloatingButton />}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
            <MenuItem
                onClick={this.onTrackUpload}
                primaryText="Track"
                leftIcon={<Map />} />
            <MenuItem
                onClick={this.onFileUpload}
                primaryText="File(s)"
                leftIcon={<Place />}/>
            </IconMenu>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
    uploadFile,
    uploadTrack
})(AddMenu);
