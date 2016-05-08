import {
    FILE_RESPONSE,
    FILE_REQUEST,
    CLEAR
} from '../constants/file';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
    case FILE_RESPONSE:
        return {
            ...state,
            isFetching: false,
            content: action.file
        };
    case FILE_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case CLEAR:
        return initialState;
    default:
        return state;
    }
};
