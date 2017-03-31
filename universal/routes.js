import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PulseApp from './containers/PulseApp';
import MyEvents from './containers/MyEvents';

import OtherEvents from './containers/OtherEvents';

export default (
  <Route path='/' component={PulseApp}>
    <IndexRoute components={{myEvents: MyEvents}} />
  </Route>
);