/**
 *  'google' object is created when Station Map is rendered,
 *  therefore google object is saved to store for
 *  access by other components
 */

const initialState = null;

/*----------  ACTION TYPES  ----------*/
const SET_GOOGLE = 'SET_GOOGLE';
const CLEAR_GOOGLE = 'CLEAR_GOOGLE';

/*----------  ACTION CREATORS  ----------*/
export const setGoogle = google => ({
  type: SET_GOOGLE,
  google
});

export const clearGoogle = () => ({
  type: CLEAR_GOOGLE
});

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GOOGLE:
      return action.google || null;
    case CLEAR_GOOGLE:
      return null;
    default: return state;
  }
};
