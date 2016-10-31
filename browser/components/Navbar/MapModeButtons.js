import React, { Component } from 'react';

export default class MapModeButtons extends Component {
  render() {
    let { mapMode, setMapMode } = this.props;
    return (
      <div id="map-mode-toggle-btn">
        <button type="submit"
                className="btn btn-default navbar-btn"
                onClick={() => setMapMode('bikes')}
                disabled={mapMode.mode === 'bikes'}>Bikes</button>
        <button type="submit"
                className="btn btn-default navbar-btn"
                onClick={() => setMapMode('docks')}
                disabled={mapMode.mode === 'docks'}>Docks</button>
      </div>
    );
  }
}
