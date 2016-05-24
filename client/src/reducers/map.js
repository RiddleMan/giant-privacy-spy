import {
    CENTER_CHANGE,
    BOXES_REQUEST,
    BOXES_RESPONSE,
    FILTER_CHANGE
} from '../constants/map';

const initialState = {
    boxes: [],
    filters: {
        startPos: {},
        endPos: {}
    },
    center: {
        lat: 51.8335932,
        lng: 16.5334442
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
    case CENTER_CHANGE:
        return {
            ...state,
            filters: {
                ...state.filters,
                startPos: [action.coords.sw.lng, action.coords.sw.lat],
                endPos: [action.coords.ne.lng, action.coords.ne.lat]
            },
            center: action.coords.center
        };
    case FILTER_CHANGE:
        return {
            ...state,
            filters: {
                ...state.filters,
                ...action.filters
            }
        };
    case BOXES_REQUEST:
        return state;
    case BOXES_RESPONSE:
        return {
            ...state,
            boxes: action.boxes
        };
    default:
        return state;
    }
};
