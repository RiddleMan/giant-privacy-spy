import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import token from './token';
import map from './map';
import list from './list';
import upload from './upload';
import layout from './layout';
import file from './file';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    routing: routeReducer,
    form: formReducer,
    token,
    map,
    list,
    upload,
    layout,
    file
});
