import {
    CHANGE
} from '../constants/token';
import { routeActions } from 'react-router-redux';
import { reset } from '../actions/common';

export const changeToken = (token) => {
    return {
        type: CHANGE,
        token
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch(changeToken());
        dispatch(routeActions.push('/login'));
        dispatch(reset());
    };
};
