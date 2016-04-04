import { SET_BOX, REQUEST_UNBOX, RECEIVE_UNBOX, CLEAR } from '../constants/list';

const initialState = {
    isFetching: false,
    files: [],
    isError: false,
    box: 'a',
    sort: '-_createDate',
    page: 1,
    pageSize: 10
};

export default (state = initialState, action) => {
    switch (action.type) {
    case SET_BOX:
        return {
            ...state,
            box: action.box
        };
    case REQUEST_UNBOX:
        return {
            ...state,
            isFetching: true
        };
    case RECEIVE_UNBOX:
        return {
            ...state,
            isFetching: false,
            page: ++state.page,
            files: state.files.concat(action.files),
            isEnd: action.files < state.pageSize
        };
    case CLEAR:
        return initialState;
    default:
        return state;
    }
};
