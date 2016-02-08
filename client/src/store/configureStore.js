import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from '../reducers';

const reduxRouterMiddleware = syncHistory(browserHistory);

let middlewareArray = [
    reduxRouterMiddleware,
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

function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(initialState) {
    let createStoreWithMiddleware;
    if (__DEV__ && __DEVTOOLS__) {
        const DevTools = require('../containers/DevTools');
        const { persistState } = require('redux-devtools');

        createStoreWithMiddleware = compose(
            middleware,
            DevTools.default.instrument(),
            persistState(getDebugSessionKey())
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

    reduxRouterMiddleware.listenForReplays(store);
    /*eslint-enable */
    return store;
}
