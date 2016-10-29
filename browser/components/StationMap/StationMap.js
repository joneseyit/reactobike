import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { API_KEY, mapProps, mapStyle, containerStyle} from '../../google-maps/config';
import StationMarker from './StationMarker';

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
    this.onPlaceClick = this.onPlaceClick.bind(this);
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

  onPlaceClick(props, marker, e) {
    console.log('placeClick');
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
    const {google} = this.props;
    const map = this.refs.google && this.refs.google.map;
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

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      this.props.addPlace({
        place: place,
        position: place.geometry.location
      });
      // let bounds = new google.maps.LatLngBounds();
      // this.props.places.forEach(place =>bounds.extend(place.position))
      // map.fitBounds((bounds));
    });
  }

componentDidMount() {
  if(this.props.autocomplete) {
    this.renderAutoComplete();
    this.setState({autocompleteInitiated: true});
  }
  this.props.updateStationFeed();
}

componentDidUpdate(prevProps) {
  const { map } = this.props;
  if (map !== prevProps.map || !this.state.autocompleteInitiated) {
    this.renderAutoComplete();
    this.setState({autocompleteInitiated: true});
  }
}

  render() {
    console.log('rendering map');
    const { loaded, google, stations, mapMode, places } = this.props;
    const { selectedPlace } = this.state;
    if (!loaded) {
      return (
          <div>Loading...</div>
        );
    } else {
      return (
        <Map ref="google" google={google}
          className="map"
          style={mapStyle}
          containerStyle={containerStyle}
          onClick={this.onMapClick}
          {...mapProps}
          center={this.state.position || mapProps.center}>
          {stations.map((station, i) => {
            return (
            <StationMarker
              stations={stations}
              {...station}
              mapMode={mapMode}
              onClick={this.onMarkerClick}
              key={i}/>
            );
          })}
        { places.map((place, idx) =>
          <Marker key={idx} onClick={this.onPlaceClick} position={place.position} />
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
  apiKey: API_KEY,
  containerStyle: {height: '100%', width: '100%'}
})(StationMapWrapper);
