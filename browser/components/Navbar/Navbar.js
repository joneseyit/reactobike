import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(evt) {
   this.setState({input: evt.target.value});
  }

  onSubmit(evt) {
    evt.preventDefault();
  }

  componentDidMount() {
    this.props.setAutoComplete(this.refs.autocomplete);
  }

  render() {
    let { mapMode, toggleMapMode, setMapMode, location } = this.props;
    return (
      <nav className="navbar navbar-inverse navbar-static-top" id="nav">
        <div className="container-fluid">
          <div className="navbar-header" id="nav-header-block">
            <button type="button" className="navbar-toggle collapsed pull-left" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">ReactoBike</Link>
          </div>
            {
              location === '/map' && (
                <div className="pull-right">
                  <div id="map-mode-toggle-btn">
                    <button type="submit" className="btn btn-default navbar-btn" onClick={()=>setMapMode('bikes')} disabled={mapMode.mode === 'bikes'}>Bikes</button>
                    <button type="submit" className="btn btn-default navbar-btn" onClick={()=>setMapMode('docks')} disabled={mapMode.mode === 'docks'}>Docks</button>
                  </div>
                </div>
              )
            }
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/map">Map</Link></li>
              <li><Link to="/data">Data</Link></li>
            </ul>
            { location === '/map' && (
                <form className="navbar-form navbar-right" role="search" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input ref="autocomplete" id="autocomplete-input"type="text" className="form-control" placeholder="Enter a location..." value={this.state.input} onChange={this.onChange}/>
                  </div>
                </form>
            )}
            { location === '/map' && (
                <div className="navbar-right">
                    <button type="submit" className="btn btn-default navbar-btn" name="autocomplete">Current Location</button>
                    <p id="navbar-or" className="navbar-right navbar-text">OR</p>
                </div> )}
          </div>
        </div>
      </nav>
    );
  }
}
