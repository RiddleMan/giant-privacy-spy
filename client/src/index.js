'use strict';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/main.scss';
injectTapEventPlugin();

if(__DEV__)
    window.Perf = require('react-addons-perf');

const content = document.getElementById('content');

render(
  <Root />,
  content
);
