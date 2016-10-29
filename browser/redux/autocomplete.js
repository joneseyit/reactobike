const initialState = null;

/*----------  ACTION TYPES  ----------*/
const SET_AUTOCOMPLETE = 'SET_AUTOCOMPLETE';
const CLEAR_AUTOCOMPLETE = 'CLEAR_AUTOCOMPLETE';

/*----------  ACTION CREATORS  ----------*/
export const setAutoComplete = node => ({
  type: SET_AUTOCOMPLETE,
  node
});

export const clearAutoComplete = () => ({
  type: CLEAR_AUTOCOMPLETE,
});

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTOCOMPLETE:
      return action.node ? action.node : null;
    case CLEAR_AUTOCOMPLETE:
      return null;
    default: return state;
  }
};
