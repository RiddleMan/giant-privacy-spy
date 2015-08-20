import React from 'react'; // eslint-disable-line
import ClientReactApp from './ClientReactApp';
import Router from 'react-router';
const Route = Router.Route;

export default (
  <Route handler={ClientReactApp}>
    <Route name="/" handler={ClientReactApp}/>
  </Route>
);
