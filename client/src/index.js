'use strict';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';

const content = document.getElementById('content');

render(
  <Root />,
  content
);
