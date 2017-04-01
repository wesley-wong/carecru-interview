import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PulseApp from './containers/PulseApp';
import MyEvents from './containers/MyEvents';

export default (
  <Route path='/' component={PulseApp}>
    <IndexRoute components={{myEvents: MyEvents}} />
  </Route>
);