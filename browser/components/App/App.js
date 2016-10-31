'use strict';

import React, { Component } from 'react';
import Navbar from '../Navbar/NavbarContainer';

export default class App extends Component {
  render() {
    const { children, location } = this.props;
    return (
      <div className="app">
        <Navbar location={location.pathname}/>
        { children }
      </div>
    );
  }
}
