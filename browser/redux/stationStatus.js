import axios from 'axios';
import { convertStationStatus } from '../converters';
import { STATION_STATUS_URL } from '../config';

/*----------  INITIAL STATE  ----------*/
export const initialState = [
  {
    id: null,
    availableBikes: null,
    availableDocks: null,
    disabledBikes: null,
    disabledDocks: null,
    isInstalled: null,
    isRenting: null,
    isReturning: null
  }
];
let timeout = null;

/*----------  ACTION TYPES  ----------*/
const RECEIVE_STATION_STATUS = 'RECEIVE_STATION_STATUS';

/*----------  ACTION CREATORS  ----------*/
export const receiveStationStatus = stations => ({
  type: RECEIVE_STATION_STATUS,
  stations
});

/*----------  THUNKS  ----------*/
export const loadStationStatus = () => dispatch => {
  axios.get(STATION_STATUS_URL)
    .then(res => {
      const stations = res.data.data.stations.map(station => convertStationStatus(station));
      dispatch(receiveStationStatus(stations));
    })
    .catch(err => {
      window.clearInterval(timeout);
      console.error(err);
    });
};

export const updateStationStatus = () => dispatch => {
 timeout = setInterval(() => {
    dispatch(loadStationStatus());
  }, 10000);
};

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_STATION_STATUS: return action.stations;
    default: return state;
  }
};
