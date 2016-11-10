import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { GAPI_KEY } from '../../config';
import { stationMapProps,
         stationMapStyle,
         stationMapContainerStyle }  from '../../google-maps/maps';
import { setOriginStation,
         setDestinationStation,
         resetStations,
         addStep } from '../../redux/route';
import { fitBounds,
         calculateRoute,
         calcLatLngDistance } from '../../google-maps/utils';
import StationMarker from './StationMarkerContainer';
import PlaceMarker from './PlaceMarker';
import store from '../../store';

class StationMap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      zoomedIn: false,
      places: []
    };
    this.onStationMarkerClick = this.onStationMarkerClick.bind(this);
    this.onPlaceMarkerClick = this.onPlaceMarkerClick.bind(this);
    this.onInfoWindowCLose = this.onInfoWindowClose.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.setState = this.setState.bind(this);
  }

  renderDirections() {
    let { google, stationMap, route } = this.props,
        { places } = this.state,
        { step1, step2, step3 } = this.refs,
        start = route.originPlace.geometry.location,
        startStation = this.getStation('origin').position,
        endStation = this.getStation('destination').position,
        end = route.destinationPlace.geometry.location;
    store.dispatch(addStep(
      calculateRoute(google, stationMap, start, startStation, 'WALKING', step1)
      ));
    store.dispatch(addStep(
      calculateRoute(google, stationMap, startStation, endStation, 'BICYCLING', step2)
      ));
    store.dispatch(addStep(
      calculateRoute(google, stationMap, endStation, end, 'WALKING', step3)
      ));
    fitBounds(google, stationMap, places);
  }

  getStation(place) {
    let { route, stations } = this.props;
    let location = place === 'destination' ?
      route.destinationPlace.geometry.location :
      route.originPlace.geometry.location;
    let pLat = location.lat();
    let pLng = location.lng();
    let station;
    stations.reduce((prev, curr) => {
      let {lat, lng} = curr.position;
      let dist = calcLatLngDistance(pLat, pLng, lat, lng, 'K');
      if (!station || dist < prev) station = curr;
      else return prev;
      return dist;
    });
    if (place === 'origin') store.dispatch(setOriginStation(station));
    else if (place === 'destination') store.dispatch(setDestinationStation(station));

    return station;
  }

  getClosestStations() {
    let { route, stations } = this.props;
    let opLat = route.originPlace.geometry.location.lat();
    let opLng = route.originPlace.geometry.location.lng();
    let dpLat = route.destinationPlace.geometry.location.lat();
    let dpLng = route.destinationPlace.geometry.location.lng();

    let originStation, destinationStation;
    stations.reduce((prev, curr) => {
      let {lat, lng} = curr.position;
      let dist = calcLatLngDistance(opLat, opLng, lat, lng, 'K');
      if (!originStation || dist < prev) originStation = curr;
      else return prev;
      return dist;
    });

    stations.reduce((prev, curr) => {
      let {lat, lng} = curr.position;
      let dist = calcLatLngDistance(dpLat, dpLng, lat, lng, 'K');
      if (!destinationStation || dist < prev) destinationStation = curr;
      else return prev;
      return dist;
    });

    store.dispatch(setOriginStation(originStation));
    store.dispatch(setDestinationStation(destinationStation));
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
    let { places } = this.state;
    if (this.state.zoomedIn) {
      fitBounds(google, stationMap, places);
      if (stationMap.getZoom() >= 17) stationMap.setZoom(15);
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
      if (route.originPlace) {
        let places = route.destinationPlace ?
        [route.originPlace, route.destinationPlace] :
        [route.originPlace];
        this.setState({places});
        console.log('fitting bounds', places.length, stationMap.getZoom());
        if (places.length === 2) {
          // this.getClosestStations();
          this.renderDirections();
        }
        fitBounds(google, stationMap, places);
      } else {
        this.setState({places: []});
        stationMap.setCenter(stationMapProps.initialCenter);
        stationMap.setZoom(stationMapProps.zoom);
        console.log('zooming out', stationMap.getZoom());
      }
    }
  }

  render() {
    const { onMapClick, onStationMarkerClick, onPlaceMarkerClick, onInfoWindowClose} = this;
    const { loaded, google, stations, route } = this.props;
    const { selectedPlace, activeMarker, showingInfoWindow, places } = this.state;
    const { originPlace, originStation, destinationStation, destinationPlace } = route;
    if (!loaded) {
      return (<div>Loading map...</div>);
    } else {
      return (
        <div className="row">
        <div className="col-sm-12 col-md-9">
        <Map ref="station-map" google={google}
          className="map"
          style={stationMapStyle}
          containerStyle={stationMapContainerStyle}
          onClick={onMapClick}
          {...stationMapProps}>

          { stations.map(({id}) => {
            return (
            <StationMarker
              id={id}
              onClick={onStationMarkerClick}
              key={id}/>
            );
          })}

          { places.map((place, idx) => (
              <PlaceMarker {...place}
                           key={idx}
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
        </div>
        <div id="directions" className="col-sm-12 col-md-3">
          <div className="row">
            <div className="dir-panel col-sm-4 col-md-12">
            <div className="dir-panel panel panel-default">
              <div className="panel-heading">
                Walking directions from {originPlace
                  ? originPlace.name :
                    'origin'} to {originStation ?
                    `station at ${originStation.name}` :
                    'CitiBike Station'}:
              </div>
              <div ref="step1" className="panel-body">
              </div>
            </div>
            </div>
            <div className="dir-panel col-sm-4 col-md-12">
            <div className="dir-panel panel panel-default">
              <div className="panel-heading">
                Biking directions from {originStation ?
                    `station at ${originStation.name}` :
                    'CitiBike Station'} to {destinationStation ?
                    `station at ${destinationStation.name}`
                    : 'CitiBike Station'}:
              </div>
              <div ref="step2" className="panel-body">
              </div>
            </div>
            </div>
            <div className="dir-panel col-sm-4 col-md-12">
            <div className="dir-panel panel panel-default">
              <div className="panel-heading">
                Walking directions from {destinationStation ?
                    `station at ${destinationStation.name}` :
                    'CitiBike Station'} to {destinationPlace
                  ? destinationPlace.name :
                    'destination'}:
              </div>
              <div ref="step3" className="panel-body">
              </div>
            </div>
            </div>
          </div>
        </div>
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: GAPI_KEY,
  libraries: ['places', 'geolocationmarker']
})(StationMap);
