import getToken from '../selectors/token';
import {
    uploadFile as apiUploadFile,
    uploadTrack as apiUploadTrack
} from '../utils/api';
import {
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_RESPONSE,
    UPLOAD_TRACK_REQUEST,
    UPLOAD_TRACK_RESPONSE,

    HIDE
} from '../constants/upload';
import { refresh } from './map';

const uploadFileRequest = () => ({
    type: UPLOAD_FILE_REQUEST
});

const uploadTrackRequest = () => ({
    type: UPLOAD_TRACK_REQUEST
});

const uploadFileResponse = () => ({
    type: UPLOAD_FILE_RESPONSE
});

const uploadTrackResponse = () => ({
    type: UPLOAD_TRACK_RESPONSE
});

export const uploadFile = (file) => {
    return (dispatch, getState) => {
        const token = getToken(getState());

        dispatch(uploadFileRequest());

        apiUploadFile({
            token,
            file
        })
        .then(() => {
            dispatch(refresh());
            dispatch(uploadFileResponse());
        });
    };
};

export const uploadTrack = (file) => {
    return (dispatch, getState) => {
        const token = getToken(getState());

        dispatch(uploadTrackRequest());

        apiUploadTrack({
            token,
            file
        })
        .then(() => dispatch(uploadTrackResponse()));
    };
};

export const hide = () => ({
    type: HIDE
});
