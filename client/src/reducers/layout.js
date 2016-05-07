import { TOGGLE_LEFT_NAV } from '../constants/layout';

const initialState = {
    leftNav: false
};

export default function(state = initialState, action) {
    switch(action.type) {
    case TOGGLE_LEFT_NAV:
        return {
            ...state,
            leftNav: !state.leftNav
        };
    default:
        return state;
    }
}
