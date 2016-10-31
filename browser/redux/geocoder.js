/**
 *  'google' object is created when Station Map is rendered,
 *  therefore google.geocoder object is saved to store for
 *  access by other components
 */

const initialState = null;

/*----------  ACTION TYPES  ----------*/
const SET_GEOCODER = 'SET_GEOCODER';
const CLEAR_GEOCODER = 'CLEAR_GEOCODER';

/*----------  ACTION CREATORS  ----------*/
export const setGeocoder = geocoder => ({
  type: SET_GEOCODER,
  geocoder
});

export const clearGeocoder = () => ({
  type: CLEAR_GEOCODER
});

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GEOCODER:
      return action.geocoder || null;
    case CLEAR_GEOCODER:
      return null;
    default: return state;
  }
};
