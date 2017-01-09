import {
    getFile as getFileApi,
    updateFile,
    removeFile as removeFileApi
} from '../utils/api';
import {
    FILE_RESPONSE,
    FILE_REQUEST,

    FILE_PROP_RESPONSE,
    FILE_PROP_REQUEST,

    CLEAR
} from '../constants/file';
import { refresh } from './map';
import { routeActions } from 'react-router-redux';

const requestProp = (update) => ({
    type: FILE_PROP_REQUEST,
    update
});

const responseProp = () => ({
    type: FILE_PROP_RESPONSE
});

export const filePropChange = (update) =>
    (dispatch, getState) => {
        const { file: {
            content
        }, token } = getState();

        const { _id } = content;

        if(!('_loc' in update))
            dispatch(requestProp(update));
        updateFile({
            token,
            _id,
            update
        })
        .then(() => {
            dispatch(refresh());
            dispatch(getFile(_id));
            dispatch(responseProp());
        });
    };

export const clear = () => ({
    type: CLEAR
});

const requestFile = () => ({
    type: FILE_REQUEST
});

const responseFile = (file) => ({
    type: FILE_RESPONSE,
    file
});

export const getFile = (id) =>
    (dispatch, getState) => {
        const { token, list: {
            box,
            sort
        }, map: {
            filters
        } } = getState();

        dispatch(requestFile());

        getFileApi({
            token,
            box,
            sort,
            filter: filters,
            id
        })
        .then((r) => r.json())
        .then((file) => dispatch(responseFile(file)));
    };

export const removeFile = () =>
    (dispatch, getState) => {
        const goToFile = (id) =>
            dispatch(routeActions.replace(`/file/${id}`));
        const goToMap = () => {
            dispatch(refresh());
            dispatch(routeActions.replace('/'));
        };

        const {
            token,
            file: {
                content: {
                    next,
                    prev,
                    _id: id
                }
            }
        } = getState();

        dispatch(requestFile());

        removeFileApi({
            token,
            id
        })
        .then(() => {
            if(!next && !prev)
                return goToMap();

            if(next)
                return goToFile(next);

            goToFile(prev);
        }, () => {});
    };
