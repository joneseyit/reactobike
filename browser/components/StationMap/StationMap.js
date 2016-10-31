import React, { Component } from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { GAPI_KEY } from '../../config';
import { stationMapProps, stationMapStyle, stationMapContainerStyle} from '../../google-maps/maps';
import StationMarker from './StationMarkerContainer';

class StationMapContents extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowCLose = this.onInfoWindowClose.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.setState = this.setState.bind(this);
  }

  // Show info window when marker is clicked, displaying station data
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  // Hide info window when 'x' is clicked
  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  // Hide info window when map is clicked
  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  // Save Google Maps objects to store for access by other components
  componentDidUpdate(prevProps) {
    const { map, setStationMap, google, setGoogle, setGeocoder } = this.props;
    if (map && map !== prevProps.map) {
      setStationMap(map);
    }
    if (google && google !== prevProps.google) {
      setGoogle(google);
      setGeocoder(new google.maps.Geocoder);
    }
  }

  render() {
    const { loaded, google, stations, places } = this.props;
    const { selectedPlace } = this.state;
    if (!loaded) {
      return (<div>Loading...</div>);
    } else {
      return (
        <Map ref="station-map" google={google}
          className="map"
          style={stationMapStyle}
          containerStyle={stationMapContainerStyle}
          onClick={this.onMapClick}
          {...stationMapProps}>

          { stations.map(stationId => {
            return (
            <StationMarker
              id={stationId}
              onClick={this.onMarkerClick}
              key={stationId}/>
            );
          })}

          { places.map((place, idx) =>
            <Marker key={idx}
                    position={place.geometry.location} />
          )}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={() => this.onInfoWindowClose()}>
              <div className="info-box">
                <table className="table">
                  <thead>
                    <tr>
                      <th>{selectedPlace.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Available Bikes:</td>
                      <td>{selectedPlace.availableBikes}</td>
                    </tr>
                    <tr>
                      <td>Available Docks:</td>
                      <td>{selectedPlace.availableDocks}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </InfoWindow>

        </Map>
      );
    }
  }
}

// Necessary for functionality of autocomplete search bar
class StationMapWrapper extends Component {
  render() {
    const props = this.props;
    const { google } = this.props;
    return (
      <Map google={google}
           className={'map'}
           visible={false}>
          <StationMapContents {...props} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GAPI_KEY,
  libraries: ['places', 'geolocationmarker']
})(StationMapWrapper);
