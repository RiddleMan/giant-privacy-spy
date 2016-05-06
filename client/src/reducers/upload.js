import {
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_RESPONSE,

    UPLOAD_TRACK_REQUEST,
    UPLOAD_TRACK_RESPONSE,

    HIDE
} from '../constants/upload';

const initialState = {
    isUploading: false,
    isSuccess: false,
    isOpen: false
};

export default function(state = initialState, action) {
    switch(action.type) {
    case UPLOAD_FILE_REQUEST:
    case UPLOAD_TRACK_REQUEST:
        return {
            ...state,
            isUploading: true
        };

    case UPLOAD_FILE_RESPONSE:
    case UPLOAD_TRACK_RESPONSE:
        return {
            ...state,
            isUploading: false,
            isSuccess: true,
            isOpen: true
        };

    case HIDE:
        return {
            ...state,
            isOpen: false
        };
    default:
        return state;
    }
}
