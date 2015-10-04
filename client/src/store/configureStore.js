import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

let middlewareArray = [
    thunkMiddleware
];

if(__DEV__) {
    const createLogger = require('redux-logger');

    middlewareArray.push(
        createLogger({
            level: 'info',
            collapsed: true
        }));
}

const middleware = applyMiddleware(...middlewareArray);

export default function configureStore(initialState) {
    let createStoreWithMiddleware;
    if (__DEV__ && __DEVTOOLS__) {
        const { devTools, persistState } = require('redux-devtools');

        createStoreWithMiddleware = compose(
            middleware,
            devTools(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(createStore);
    } else {
        createStoreWithMiddleware = middleware(createStore);
    }

    const store = createStoreWithMiddleware(rootReducer, initialState);

    /*eslint-disable */
    if (__DEV__ && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    /*eslint-enable */
    return store;
}
