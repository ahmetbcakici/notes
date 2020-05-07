import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import App from './views/App';
import Login from './views/Login';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login} exact />
        <ProtectedRoute path='/app' component={App} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
