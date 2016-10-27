'use strict';

import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App/App';
import Home from './components/Home/Home';
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
          <IndexRoute component={Home}/>
        </Route>
      </Router>
      );
  }
}
