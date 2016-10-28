import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    this.props.updateAutocomplete(evt.target.value);
  }

  componentDidUpdate() {
    console.log(this.props.autocomplete);
  }

  render() {
    let { mapMode, toggleMapMode, location } = this.props;
    return (
      <nav className="navbar navbar-inverse navbar-static-top" id="nav">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Simple Citibike</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input ref="autocomplete" type="text" className="form-control" placeholder="Where to?" value={this.props.autocomplete} onChange={this.onChange}/>
              </div>
              <button type="submit" className="btn btn-default">Go</button>
            </form>
            <ul className="nav navbar-nav">
              <li><Link to="/data">Station Data</Link></li>
              <li><Link to="/map">Station Map</Link></li>
            </ul>
            {
              location === '/map' && (
                <div className="nav navbar-nav navbar-right">
                  <div id="map-mode-toggle-btn">
                    <button type="submit" className="btn btn-default navbar-btn" onClick={toggleMapMode}>Show {mapMode.mode === 'bikes' ? 'Docks' : 'Bikes'}</button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </nav>
    );
  }
}
