import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      autocompleteInitiated: false,
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

renderAutoComplete() {
    const { google } = this.props;
    const map = this.refs['station-map'] && this.refs['station-map'].map;

    if (!google || !map) return;

    const aref = this.props.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    var autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      this.props.addPlace({
        place: place,
        position: place.geometry.location
      });

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      // let bounds = new google.maps.LatLngBounds();
      // this.props.places.forEach(place =>bounds.extend(place.position))
      // map.fitBounds((bounds));
    });
  }

componentDidMount() {
  this.props.updateStationStatus();
  if (this.props.autocomplete) {
    this.renderAutoComplete();
    this.setState({autocompleteInitiated: true});
  }
}

componentDidUpdate(prevProps) {
  const { map } = this.props;
  if (map !== prevProps.map || !this.state.autocompleteInitiated) {
    this.renderAutoComplete();
    this.setState({autocompleteInitiated: true});
  }
}

  render() {
    const { loaded, google, mapMode, stations, places } = this.props;
    const { selectedPlace } = this.state;
    if (!loaded) {
      return (
          <div>Loading...</div>
        );
    } else {
      return (
        <Map ref="station-map" google={google}
          className="map"
          style={stationMapStyle}
          containerStyle={stationMapContainerStyle}
          onClick={this.onMapClick}
          {...stationMapProps}
          center={this.state.position || stationMapProps.center}>

          { stations.map(stationId => {
            return (
            <StationMarker
              id={stationId}
              mapMode={mapMode}
              onClick={this.onMarkerClick}
              key={stationId}/>
            );
          })}

          { places.map((place, idx) =>
            <Marker key={idx}
                    position={place.position} />
            )
          }

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

class StationMapWrapper extends Component {
  render() {
    const props = this.props;
    const {google} = this.props;

    return (
      <Map google={google}
          className={'map'}
          visible={false}
          >
            <StationMapContents {...props} />
      </Map>
    );
  }
}


Marker.propTypes = {
  icon: React.PropTypes.object
};

export default GoogleApiWrapper({
  apiKey: GAPI_KEY,
  containerStyle: {height: '100%', width: '100%'}
})(StationMapWrapper);
