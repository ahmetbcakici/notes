import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import App from './views/App';
import Login from './views/Login';

function Router() {
  return (
    <BrowserRouter>
      <Route path='/' component={Login} />
      <Route path='/app' component={App}  />
    </BrowserRouter>
  );
}

export default Router;
