'use strict';

import { combineReducers } from 'redux';
import stations from './stations';
import mapMode from './mapMode';

export default combineReducers({
  stations,
  mapMode
});
