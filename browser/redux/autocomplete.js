// const initialState = '';

// /*----------  ACTION TYPES  ----------*/
// const UPDATE_AUTOCOMPLETE = 'UPDATE_AUTOCOMPLETE';
// const CLEAR_AUTOCOMPLETE = 'CLEAR_AUTOCOMPLETE';

// /*----------  ACTION CREATORS  ----------*/
// export const updateAutocomplete = value => ({
//   type: UPDATE_AUTOCOMPLETE,
//   value
// });

// export const clearAutocomplete = () => ({
//   type: CLEAR_AUTOCOMPLETE,
// });

// /*----------  REDUCER  ----------*/
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_AUTOCOMPLETE:
//       return action.value;
//     case CLEAR_AUTOCOMPLETE:
//       return '';
//     default: return state;
//   }
// };
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
      return action.node;
    case CLEAR_AUTOCOMPLETE:
      return null;
    default: return state;
  }
};
