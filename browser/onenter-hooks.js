'use strict';
import store from './store';
import { fetchAndReceiveStations } from './redux/stations';

export const onStationsEnter = () => store.dispatch(fetchAndReceiveStations());
