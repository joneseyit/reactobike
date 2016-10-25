import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/" className="navbar-brand">Home</Link>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/stations">Stations</Link>
          </li>
        </ul>
      </div>
    );
  }
}
