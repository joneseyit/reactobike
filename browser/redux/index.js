'use strict';

import { combineReducers } from 'redux';
import stationInfo from './stationInfo';
import stationStatus from './stationStatus';
import mapMode from './mapMode';
import autocomplete from './autocomplete';
import currentLocation from './currentLocation';
import places from './places';

export default combineReducers({
  stationInfo,
  stationStatus,
  mapMode,
  autocomplete,
  currentLocation,
  places
});
