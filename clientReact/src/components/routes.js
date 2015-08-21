import React from 'react'; // eslint-disable-line
import App from './App';
import { LoginView, MainView } from './views/index';
import { Authenticated } from './utils/index';
import { Route, DefaultRoute } from 'react-router';

export default (
  <Route handler={App}>
    <DefaultRoute handler={LoginView}/>
    <Route path="/main" handler={Authenticated}>
        <Route name="index" path="/main/index" handler={MainView} />
    </Route>
  </Route>
);
