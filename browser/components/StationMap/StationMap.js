import React, { Component } from 'react';
import {Map as GoogleMap, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { API_KEY, mapProps, mapStyle, containerStyle} from '../../google-maps/config';
import Marker from '../../google-maps/MarkerWrapper';

class StationMap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowCLose = this.onInfoWindowClose.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.setState = this.setState.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    const { loaded, google, stations, mapMode } = this.props;
    const { selectedPlace } = this.state;
    if (!loaded) {
      return (
          <div>Loading...</div>
        );
    } else {
      return (
        <GoogleMap ref="google" google={google}
          className="map"
          style={mapStyle}
          containerStyle={containerStyle}
          onClick={this.onMapClick}
          {...mapProps}>
          {stations.map((station, i) => {
            return (
            <Marker
              {...station}
              mapMode={mapMode}
              onClick={this.onMarkerClick}
              key={i}/>
            );
          })}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={() => this.onInfoWindowClose()}>
                <div className="info-box">
                  <h4>{selectedPlace.name}</h4>
                  <ul>
                    <li>Available Bikes: {selectedPlace.availableBikes}</li>
                    <li>Available Docks: {selectedPlace.availableDocks}</li>
                  </ul>
                </div>
            </InfoWindow>
        </GoogleMap>
      );
    }
  }
}

Marker.propTypes = {
  icon: React.PropTypes.object
};

export default GoogleApiWrapper({
  apiKey: API_KEY,
  containerStyle: {height: '100%', width: '100%'}
})(StationMap);
