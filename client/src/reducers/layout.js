import { TOGGLE_LEFT_NAV } from '../constants/layout';
import { RESET } from '../constants/common';

const initialState = {
    leftNav: false
};

export default function(state = initialState, action) {
    switch(action.type) {

    case TOGGLE_LEFT_NAV:
        return {
            ...state,
            leftNav: action.open
        };

    case RESET:
        return initialState;

    default:
        return state;
    }
}
