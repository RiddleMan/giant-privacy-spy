import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingButton from './FloatingButton';
import Map from 'material-ui/svg-icons/maps/map';
import Place from 'material-ui/svg-icons/maps/place';
import { fileOpen } from '../../utils/files';
import { connect } from 'react-redux';
import { uploadFile, uploadTrack, hide } from '../../actions/upload';

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
        const { isUploading } = this.props;

        return (
            <IconMenu
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px'
                }}
                iconButtonElement={
                    <FloatingButton
                        isLoading={isUploading}/>}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                    <MenuItem
                        onTouchTap={this.onTrackUpload}
                        primaryText="Track"
                        leftIcon={<Map />} />
                    <MenuItem
                        onTouchTap={this.onFileUpload}
                        primaryText="File(s)"
                        leftIcon={<Place />}/>
            </IconMenu>
        );
    }
}

const mapStateToProps = (state) => {
    const { isUploading, isSuccess, isOpen } = state.upload;

    return {
        isUploading,
        isSuccess,
        isOpen
    };
};

export default connect(mapStateToProps, {
    hide,
    uploadFile,
    uploadTrack
})(AddMenu);
