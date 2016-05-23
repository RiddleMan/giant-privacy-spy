import { getFile as getFileApi, updateFile } from '../utils/api';
import {
    FILE_RESPONSE,
    FILE_REQUEST,

    FILE_PROP_RESPONSE,
    FILE_PROP_REQUEST,

    CLEAR
} from '../constants/file';

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
        .then(() => dispatch(responseProp()));
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
            sort,
            after,
            before,
            extensions
        } } = getState();

        dispatch(requestFile());

        getFileApi({
            token,
            box,
            sort,
            after,
            before,
            extensions,
            id
        })
        .then((r) => r.json())
        .then((file) => dispatch(responseFile(file)));
    };
