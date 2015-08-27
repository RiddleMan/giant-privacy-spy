'use strict';

import React from 'react';
import Router from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes';

injectTapEventPlugin();
const content = document.getElementById('content');

Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, content);
});
