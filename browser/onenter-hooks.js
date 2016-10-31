'use strict';
import store from './store';
import { loadStationInfo } from './redux/stationInfo';
import { loadStationStatus } from './redux/stationStatus';

export const onAppEnter = () => {
  store.dispatch(loadStationStatus());
  store.dispatch(loadStationInfo());
};
