'use strict';

import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './components/App/App';
import StationData from './components/StationData/StationDataContainer';
import StationMap from './components/StationMap/StationMapContainer';
import { onAppEnter } from './onenter-hooks';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={onAppEnter}>
          <Route path="/data" component={StationData}/>
          <Route path="/map" component={StationMap}/>
          <IndexRedirect to="/map"/>
        </Route>
      </Router>
      );
  }
}
