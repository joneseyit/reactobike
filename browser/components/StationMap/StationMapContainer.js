import { connect } from 'react-redux';
import StationMap from './StationMap';
import { setStationMap } from '../../redux/stationMap';
import { setGoogle } from '../../redux/google';
import { setGeocoder } from '../../redux/geocoder';


const distance = (lat1, lng1, lat2, lng2, unit) => {
  let radlat1 = Math.PI * lat1 / 180;
  let radlat2 = Math.PI * lat2 / 180;
  let theta = lng1 - lng2;
  let radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit.toLowerCase() === 'k') { dist = dist * 1.609344; }
  if (unit.toLowerCase() === 'n') { dist = dist * 0.8684; }
  return dist;
};


const mapStateToProps = ({ stationInfo, google, stationMap, zoomLevel, route }) => {
    let latOrigin = route.originPlace ? route.originPlace.geometry.location.lat() : null;
    let lngOrigin = route.originPlace ? route.originPlace.geometry.location.lng() : null;
    let latDestination = route.destinationPlace ? route.destinationPlace.geometry.location.lat() : null;
    let lngDestination = route.destinationPlace ? route.destinationPlace.geometry.location.lng() : null;
    const stations = stationInfo
      .filter(station => {
        if (route.originPlace) {
        let { lat, lng} = station.position;
        console.log('station', lat, lng);
        console.log('origin', latOrigin, lngOrigin);
        let dist = distance(lat, lng, latOrigin, lngOrigin, 'K');
        console.log(dist);
          if (dist < 0.5) return true;
          if (route.destinationPlace) {
            if (distance(lat, lng, latDestination, lngDestination, 'K') < 0.5) return true;
          }
          return false;
        }
        return true;
      })
      .map(station => station.id);
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
