import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
          <Link to="/" className="navbar-brand">Home</Link>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/stations">Stations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/map">Map</Link>
            </li>
          </ul>
      </div>
    );
  }
}
