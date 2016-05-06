'use strict';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/main.scss';
import { AppContainer } from 'react-hot-loader';

const store = configureStore();
injectTapEventPlugin();

if(__DEV__)
    window.Perf = require('react-addons-perf');

const content = document.getElementById('content');

render(
    <AppContainer
        component={Root}
        props={{ store }} />,
    content
);

if(module.hot) {
    module.hot.accept('./containers/Root', () => {
        render(
            <AppContainer
                component={require('./containers/Root').default}
                props={{ store }} />,
            content
        );
    });
}
