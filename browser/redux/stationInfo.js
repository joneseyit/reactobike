import axios from 'axios';
import { convertStationInfo } from '../converters';
import { STATION_INFORMATION_URL } from '../config';

/*----------  INITIAL STATE  ----------*/
const initialState = [
  {
    id: null,
    name: null,
    position: {lat: null, lng: null},
    capacity: null,
  }
];

/*----------  ACTION TYPES  ----------*/
const RECEIVE_STATION_INFO = 'RECEIVE_STATION_INFO';

/*----------  ACTION CREATORS  ----------*/
export const receiveStationInfo = stations => ({
  type: RECEIVE_STATION_INFO,
  stations
});

/*----------  THUNKS  ----------*/
export const loadStationInfo = () => dispatch => {
  axios.get(STATION_INFORMATION_URL)
    .then(res => {
      let stations = res.data.data.stations.map(station => convertStationInfo(station));
      dispatch(receiveStationInfo(stations));
    })
    .catch(err => console.error(err));
};

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_STATION_INFO: return action.stations;
    default: return state;
  }
};
