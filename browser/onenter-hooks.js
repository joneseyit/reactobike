'use strict';
import store from './store';
import { fetchAndReceiveStations } from './redux/stations';

export const onAppEnter = () => store.dispatch(fetchAndReceiveStations());
