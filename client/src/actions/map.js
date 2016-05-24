import {
    CENTER_CHANGE,
    FILTER_CHANGE,
    BOXES_REQUEST,
    BOXES_RESPONSE
} from '../constants/map';
import debounce from 'lodash/debounce';
import { getBoxes } from '../utils/api';
import getToken from '../selectors/token';

const requestBoxes = () => {
    return {
        type: BOXES_REQUEST
    };
};

const responseBoxes = (boxes) => {
    return {
        type: BOXES_RESPONSE,
        boxes: boxes
    };
};

export const changeCenter = (coords) => {
    return {
        type: CENTER_CHANGE,
        coords
    };
};

export const changeFilter = (filters) => {
    return {
        type: FILTER_CHANGE,
        filters
    };
};

const getBoxesDebounced = debounce(
    (dispatch, getState) => {
        const { map: {
            filters
        }} = getState();

        dispatch(requestBoxes());
        getBoxes({
            token: getToken(getState()),
            filter: filters
        })
            .then((r) => r.json())
            .then((r) => dispatch(responseBoxes(r)));
    }, 500);

export const filterChange = (filters) => {
    return (dispatch, getState) => {
        dispatch(changeFilter(filters));
        getBoxesDebounced(dispatch, getState);
    };
};

export const centerChange = (coords) => {
    return (dispatch, getState) => {
        dispatch(changeCenter(coords));
        getBoxesDebounced(dispatch, getState);
    };
};
