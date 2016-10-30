'use strict';

import { combineReducers } from 'redux';
import stationInfo from './stationInfo';
import stationStatus from './stationStatus';
import stationMap from './stationMap';
import google from './google';
import mapMode from './mapMode';
import currentLocation from './currentLocation';
import places from './places';

export default combineReducers({
  stationInfo,
  stationStatus,
  stationMap,
  google,
  mapMode,
  currentLocation,
  places
});
