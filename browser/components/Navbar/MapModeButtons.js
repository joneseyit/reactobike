import React, { Component } from 'react';

export default class MapModeButtons extends Component {
  render() {
    const { mapMode, setMapMode } = this.props;
    return (
      <div id="map-mode-toggle-btn">
        <button type="submit"
                className="btn btn-default navbar-btn"
                onClick={() => setMapMode('bikes')}
                disabled={mapMode === 'bikes'}>Bikes</button>
        <button type="submit"
                className="btn btn-default navbar-btn"
                onClick={() => setMapMode('docks')}
                disabled={mapMode === 'docks'}>Docks</button>
      </div>
    );
  }
}
