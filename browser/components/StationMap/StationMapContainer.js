import { connect } from 'react-redux';
import StationMap from './StationMap';
import { setStationMap } from '../../redux/stationMap';
import { setGoogle } from '../../redux/google';
import { setGeocoder } from '../../redux/geocoder';
import { calcLatLngDistance } from '../../google-maps/utils';


const mapStateToProps = ({ stationInfo, google, stationMap, zoomLevel, route }) => {
    let latOrigin = route.originPlace ?
      route.originPlace.geometry.location.lat() : null;
    let lngOrigin = route.originPlace ?
      route.originPlace.geometry.location.lng() : null;
    let latDestination = route.destinationPlace ?
      route.destinationPlace.geometry.location.lat() : null;
    let lngDestination = route.destinationPlace ?
      route.destinationPlace.geometry.location.lng() : null;

    const stations = stationInfo
      .filter(station => {
        if (route.originPlace) {
        let { lat, lng} = station.position;
        let dist = calcLatLngDistance(lat, lng, latOrigin, lngOrigin, 'K');
          if (dist < 0.5) return true;
          if (route.destinationPlace) {
            if (calcLatLngDistance(lat, lng, latDestination, lngDestination, 'K') < 0.5) return true;
          }
          return false;
        }
        return true;
      })
      .map(({id, position}) => ({id, position}));
    return { stations, route, google, stationMap, zoomLevel};
};

const mapDispatchToProps = dispatch => ({
  setStationMap: map => dispatch(setStationMap(map)),
  setGoogle: google => dispatch(setGoogle(google)),
  setGeocoder: geocoder => dispatch(setGeocoder(geocoder))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationMap);
