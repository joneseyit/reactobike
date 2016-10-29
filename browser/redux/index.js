'use strict';

import { combineReducers } from 'redux';
import stations from './stations';
import mapMode from './mapMode';
import autocomplete from './autocomplete';
import currentLocation from './currentLocation';
import places from './places';

export default combineReducers({
  stations,
  mapMode,
  autocomplete,
  currentLocation,
  places
});
