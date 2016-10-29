'use strict';
import store from './store';
import { fetchAndReceiveStations } from './redux/stations';
import { loadCurrentLocation } from './redux/currentLocation';

export const onAppEnter = () => {
  store.dispatch(fetchAndReceiveStations());
  store.dispatch(loadCurrentLocation());
}
