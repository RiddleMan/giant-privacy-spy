import { CHANGE } from '../constants/token';

export default (state = '', action) => {
    switch (action.type) {
    case CHANGE:
        return action.token || '';
    default:
        return state;
    }
};
