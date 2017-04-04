import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CareCruApp from './containers/CareCruApp';
import journalEntries from './containers/journalEntries';

export default (
  <Route path='/' component={CareCruApp}>
    <IndexRoute components={{journalEntries: journalEntries}} />
  </Route>
);