import {
    FILE_RESPONSE,
    FILE_REQUEST,

    FILE_PROP_REQUEST,

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

    case FILE_PROP_REQUEST:
        return {
            ...state,
            content: {
                ...state.content,
                ...action.update
            }
        };
    case CLEAR:
        return initialState;
    default:
        return state;
    }
};
