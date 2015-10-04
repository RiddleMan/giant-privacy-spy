'use strict';

import 'babel-core/polyfill';
import React from 'react';
import Root from './containers/Root';
import './styles/main.scss';

const content = document.getElementById('content');

React.render(
  <Root />,
  content
);
