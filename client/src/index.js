'use strict';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/main.scss';
import { AppContainer } from 'react-hot-loader';

injectTapEventPlugin();

if(__DEV__)
    window.Perf = require('react-addons-perf');

const content = document.getElementById('content');

render(
    <AppContainer>
        <Root />
    </AppContainer>,
    content
);

if(module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NextRoot = require('./containers/Root').default;

        render(
            <AppContainer>
                <NextRoot />
            </AppContainer>,
            content
        );
    });
}
