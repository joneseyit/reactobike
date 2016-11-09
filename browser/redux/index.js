import { combineReducers } from 'redux';
import stationInfo from './stationInfo';
import stationStatus from './stationStatus';
import stationMap from './stationMap';
import google from './google';
import geocoder from './geocoder';
import mapMode from './mapMode';
import places from './places';
import route from './route';

export default combineReducers({
  stationInfo,
  stationStatus,
  stationMap,
  google,
  geocoder,
  mapMode,
  places,
  route
});
