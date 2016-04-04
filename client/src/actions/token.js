import {
    CHANGE
} from '../constants/token';

export const changeToken = (token) => {
    return {
        type: CHANGE,
        token
    };
};
