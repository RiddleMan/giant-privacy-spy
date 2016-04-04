import {
    CENTER_CHANGE,
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

const getBoxesDebounced = debounce(
    (dispatch, getState) => {
        const { map: {
            bounds
        }} = getState();

        dispatch(requestBoxes());
        getBoxes({
            token: getToken(getState()),
            filter: {
                startPos: [bounds.sw.lng, bounds.sw.lat],
                endPos: [bounds.ne.lng, bounds.ne.lat]
            }
        })
            .then((r) => r.json())
            .then((r) => dispatch(responseBoxes(r)));
    }, 500);

export const centerChange = (coords) => {
    return (dispatch, getState) => {
        dispatch(changeCenter(coords));
        getBoxesDebounced(dispatch, getState);
    };
};
