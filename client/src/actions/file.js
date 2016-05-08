import { getFile as getFileApi } from '../utils/api';
import {
    FILE_RESPONSE,
    FILE_REQUEST,
    CLEAR
} from '../constants/file';

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
