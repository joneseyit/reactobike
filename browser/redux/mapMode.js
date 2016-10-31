const initialState = 'bikes';

/*----------  ACTION TYPES  ----------*/
const SET_MAP_MODE = 'SET_MAP_MODE';
const TOGGLE_MAP_MODE = 'TOGGLE_MAP_MODE';

/*----------  ACTION CREATORS  ----------*/
export const setMapMode = mode => ({
  type: SET_MAP_MODE,
  mode
});

export const toggleMapMode = () => ({
  type: TOGGLE_MAP_MODE
});

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MAP_MODE:
      return action.mode;
    case TOGGLE_MAP_MODE:
      return state.mode === 'bikes' ? 'docks' : 'bikes';
    default: return state;
  }
};
