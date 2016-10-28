'use strict';

import { combineReducers } from 'redux';
import stations from './stations';
import mapMode from './mapMode';
import autocomplete from './autocomplete';

export default combineReducers({
  stations,
  mapMode,
  autocomplete
});
