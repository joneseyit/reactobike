/**
 *  Google Map object is created when Station Map is rendered,
 *  therefore map object is saved to store for
 *  access by other components
 */

const initialState = null;

/*----------  ACTION TYPES  ----------*/
const SET_STATION_MAP = 'SET_STATION_MAP';
const CLEAR_STATION_MAP = 'CLEAR_STATION_MAP';

/*----------  ACTION CREATORS  ----------*/
export const setStationMap = map => ({
  type: SET_STATION_MAP,
  map
});

export const clearStationMap = () => ({
  type: CLEAR_STATION_MAP
});

/*----------  THUNKS  ----------*/

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STATION_MAP:
      return action.map || null;
    case CLEAR_STATION_MAP:
      return null;
    default: return state;
  }
};
