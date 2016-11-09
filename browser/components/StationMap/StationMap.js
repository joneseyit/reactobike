import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { GAPI_KEY } from '../../config';
import { stationMapProps,
         stationMapStyle,
         stationMapContainerStyle }  from '../../google-maps/maps';
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
    let { google, stationMap, route } = this.props;
    if (this.state.zoomedIn) {
      let places = [];
      if (route.origin) places.push(route.origin);
      if (route.destination) places.push(route.destination);
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
    const { setStationMap, google, setGoogle, setGeocoder, route } = this.props;
    const stationMapRef = this.refs['station-map'];
    const stationMap = stationMapRef && stationMapRef.map;

    if (stationMap && stationMap !== prevProps.stationMap) {
      setStationMap(stationMap);
    }

    if (google && google !== prevProps.google) {
      setGoogle(google);
      setGeocoder(new google.maps.Geocoder);
    }

    if (stationMap && google &&
          (prevProps.route.originPlace !== route.originPlace ||
           prevProps.route.destinationPlace !== route.destinationPlace) ) {
      let places = [];
      if (route.originPlace) places.push(route.originPlace);
      if (route.destinationPlace) places.push(route.destinationPlace);
      if (places.length) {
        fitBounds(google, stationMap, places);
      } else {
        stationMap.setCenter(stationMapProps.initialCenter);
        stationMap.setZoom(stationMapProps.zoom);
      }
    }
  }
  render() {
    const { onMapClick, onStationMarkerClick, onPlaceMarkerClick, onInfoWindowClose} = this;
    const { loaded, google, stations, route } = this.props;
    const { selectedPlace, activeMarker, showingInfoWindow } = this.state;
    let places = [];
    if (route.origin) places.push(route.origin);
    if (route.destination) places.push(route.destination);
    console.log(route);
    if (!loaded) {
      return (<div>Loading map...</div>);
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

          { places.map((place, idx) => (
              <PlaceMarker key={idx}
                           onClick={() => onPlaceMarkerClick(place.geometry.location)}
                           position={place.geometry.location} />
            ))

          }

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
