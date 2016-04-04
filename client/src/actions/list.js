import { routeActions } from 'react-router-redux';
import { changeCenter } from './map';
import {
    SET_BOX,
    REQUEST_UNBOX,
    RECEIVE_UNBOX,
    CLEAR
} from '../constants/list';
import { getFiles } from '../utils/api';
import getToken from '../selectors/token';

export const goToList = ({
    _id,
    center
}) => {
    return (dispatch) => {
        dispatch(changeCenter(center));
        dispatch(routeActions.push(`list/${_id}`));
    };
};

const requestUnbox = () => ({
    type: REQUEST_UNBOX
});

const receiveUnbox = (files, isError = false) => ({
    type: RECEIVE_UNBOX,
    files,
    isError
});

export const setGeoHash = (_id) => {
    return {
        type: SET_BOX,
        box: _id
    };
};

export const getNextUnboxed = () =>
    (dispatch, getState) => {
        const token = getToken(getState());
        const { box, page, isFetching, isEnd, pageSize } = getState().list;

        if(isFetching || isEnd)
            return;

        dispatch(requestUnbox());
        getFiles({
            token,
            page,
            box,
            size: pageSize
        })
        .then((r) => r.json())
        .then((r) => dispatch(receiveUnbox(r)));
    };

export const clear = () => ({
    type: CLEAR
});
