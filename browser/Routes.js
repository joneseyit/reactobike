'use strict';

import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App/App';
import Stations from './components/Stations/StationsContainer';
import { onStationsEnter } from './onenter-hooks';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={onStationsEnter}>
          <Route path="/stations" component={Stations}/>
        </Route>
      </Router>
      );
  }
}
