import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CareCruApp from './containers/CareCruApp';
import MyEvents from './containers/MyEvents';

export default (
  <Route path='/' component={CareCruApp}>
    <IndexRoute components={{myEvents: MyEvents}} />
  </Route>
);