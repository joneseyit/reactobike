'use strict';

import Promise from 'bluebird';
import axios from 'axios';
import { convertStations } from '../converters';
import { STATION_INFORMATION_URL, STATION_STATUS_URL } from '../citibikeAPI';

/*----------  INITIAL STATE  ----------*/
const initialState = [
  {
    id: null,
    name: null,
    lat: null,
    lon: null,
    capacity: null,
    availableBikes: null,
    availableDocks: null,
    isInstalled: null,
    isRenting: null,
    isReturning: null
  }
];

/*----------  ACTION TYPES  ----------*/
const RECEIVE_STATIONS = 'RECEIVE_STATIONS';
const UPDATE_STATIONS = 'UPDATE_STATIONS';

/*----------  ACTION CREATORS  ----------*/
export const receiveStations = stations => ({
  type: RECEIVE_STATIONS,
  stations
});

const updateStations = stations => ({
  type: UPDATE_STATIONS,
  stations
})

/*----------  THUNKS  ----------*/
export const fetchAndReceiveStations = () => dispatch => {
  const infoPromise = axios.get(STATION_INFORMATION_URL)
  const statusPromise = axios.get(STATION_STATUS_URL)

  Promise.all([infoPromise, statusPromise]).spread((infoResponse, statusResponse) => {
    const infoDetails = infoResponse.data.data.stations;
    const statusDetails = statusResponse.data.data.stations;
    const convertedStations = convertStations(infoDetails, statusDetails);
    dispatch(receiveStations(convertedStations));
  });
};

export const updateStationFeed = () => dispatch => {
 let timeout = setInterval(function() {
    dispatch(fetchAndReceiveStations());
  }, 10000);
}

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_STATIONS: return action.stations;
    default: return state;
  }
};
