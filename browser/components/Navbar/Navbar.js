import React, { Component } from 'react';
import { Link } from 'react-router';
import SearchBar from './SearchBarContainer';
import LocationButton from './LocationButtonContainer';
import MapModeButtons from './MapModeButtonsContainer';

export default class Navbar extends Component {
  render() {
    let { location } = this.props;
    return (
      <nav className="navbar navbar-inverse navbar-static-top" id="nav">
        <div className="container-fluid">
          <div className="navbar-header" id="nav-header-block">
            <button type="button"
                    className="navbar-toggle collapsed pull-left"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">ReactoBike</Link>
          </div>
            {
              location === '/map' && (
                <div className="pull-right">
                  <MapModeButtons />
                </div>
              )
            }
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/map">Map</Link></li>
              <li><Link to="/data">Data</Link></li>
            </ul>
            { location === '/map' && (
                <form className="navbar-form navbar-right"
                      role="search"
                      onSubmit={evt => evt.preventDefault()}>
                  <div className="form-group">
                    <SearchBar />
                  </div>
                </form>
            )}
            { location === '/map' && (
                <div className="navbar-right">
                    <LocationButton />
                    <p id="navbar-or" className="navbar-right navbar-text">OR</p>
                </div> )}
          </div>
        </div>
      </nav>
    );
  }
}
