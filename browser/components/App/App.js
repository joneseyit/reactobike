'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import Navbar from '../Navbar/Navbar';

export default class App extends Component {
  render() {
    let { children } = this.props;
    return (
      <div className="container">
        <h1>Simple Citibike Data</h1>
        <Navbar/>
        { children }
      </div>
    );
  }
}
