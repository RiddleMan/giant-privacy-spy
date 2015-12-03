'use strict';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const content = document.getElementById('content');

render(
  <Root />,
  content
);
