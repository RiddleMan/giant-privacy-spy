'use strict';

import ClientReactApp from './ClientReactApp';
import React from 'react';
import Router from 'react-router';
const Route = Router.Route;

const content = document.getElementById('content');

const Routes = (
  <Route handler={ClientReactApp}>
    <Route name="/" handler={ClientReactApp}/>
  </Route>
);

Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, content);
});
