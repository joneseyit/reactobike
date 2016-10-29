'use strict';
import store from './store';
import { loadStationInfo } from './redux/stationInfo';
import { loadStationStatus } from './redux/stationStatus';
import { loadCurrentLocation } from './redux/currentLocation';

export const onAppEnter = () => {
  store.dispatch(loadStationStatus());
  store.dispatch(loadStationInfo());
  store.dispatch(loadCurrentLocation());
}
