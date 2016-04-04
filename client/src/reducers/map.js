import {
    CENTER_CHANGE,
    BOXES_REQUEST,
    BOXES_RESPONSE
} from '../constants/map';

const initialState = {
    boxes: [],
    center: {
        lat: 51.8335932,
        lng: 16.5334442
    },
    bounds: {
        ne: {},
        sw: {}
    },
    predicate: {

    }
};

export default (state = initialState, action) => {
    switch (action.type) {
    case CENTER_CHANGE:
        return {
            ...state,
            center: action.coords.center,
            bounds: {
                ne: action.coords.ne,
                sw: action.coords.sw
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
