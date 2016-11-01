import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { GAPI_KEY } from '../../config';
import { stationMapProps, stationMapStyle, stationMapContainerStyle}  from '../../google-maps/maps';
import { fitBounds } from '../../google-maps/utils';
import StationMarker from './StationMarkerContainer';
import PlaceMarker from './PlaceMarker';

class StationMap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      zoomedIn: false
    };
    this.onStationMarkerClick = this.onStationMarkerClick.bind(this);
    this.onPlaceMarkerClick = this.onPlaceMarkerClick.bind(this);
    this.onInfoWindowCLose = this.onInfoWindowClose.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.setState = this.setState.bind(this);
  }

  // Show info window when marker is clicked, displaying station data
  onStationMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  // Zoom in on place marker on when clicked
  onPlaceMarkerClick(location) {
    let { google, stationMap, places } = this.props;
    if (this.state.zoomedIn) {
      fitBounds(google, stationMap, places);
      this.setState({ zoomedIn: false });
    } else {
      stationMap.setCenter(location);
      stationMap.setZoom(17);
      this.setState({ zoomedIn: true });
    }
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
    const { setStationMap, google, setGoogle, setGeocoder, places } = this.props;
    const stationMapRef = this.refs['station-map'];
    const stationMap = stationMapRef && stationMapRef.map;

    if (stationMap && stationMap !== prevProps.stationMap) {
      setStationMap(stationMap);
    }

    if (google && google !== prevProps.google) {
      setGoogle(google);
      setGeocoder(new google.maps.Geocoder);
    }

    if (stationMap && google && prevProps.places.length !== places.length) {
      fitBounds(google, stationMap, places);
    }

  }

  render() {
    const { onMapClick, onStationMarkerClick, onPlaceMarkerClick, onInfoWindowClose} = this;
    const { loaded, google, stations, places } = this.props;
    const { selectedPlace, activeMarker, showingInfoWindow } = this.state;
    if (!loaded) {
      return (<div>Loading...</div>);
    } else {
      return (
        <Map ref="station-map" google={google}
          className="map"
          style={stationMapStyle}
          containerStyle={stationMapContainerStyle}
          onClick={onMapClick}
          {...stationMapProps}>

          { stations.map(stationId => {
            return (
            <StationMarker
              id={stationId}
              onClick={onStationMarkerClick}
              key={stationId}/>
            );
          })}

          { places.map((place, idx) =>
            <PlaceMarker key={idx}
                    idx={idx}
                    onClick={() => onPlaceMarkerClick(place.geometry.location)}
                    position={place.geometry.location} />
          )}

          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={() => onInfoWindowClose()}>
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

export default GoogleApiWrapper({
  apiKey: GAPI_KEY,
  libraries: ['places', 'geolocationmarker']
})(StationMap);
