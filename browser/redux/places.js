const initialState = [];

/*----------  ACTION TYPES  ----------*/
const ADD_PLACE = 'ADD_PLACE';
const REMOVE_PLACE = 'REMOVE_PLACE';
const RESET_PLACES = 'RESET_PLACES';
const ADD_CURRENT_LOCATION = 'ADD_CURRENT_LOCATION';

/*----------  ACTION CREATORS  ----------*/
export const addPlace = place => {
  console.log('in the action creator', place)
  return ({
  type: ADD_PLACE,
  place
})
};

export const addCurrentLocation = location => ({
  type: ADD_CURRENT_LOCATION,
  location
});

export const removePlace = place => ({
  type: REMOVE_PLACE,
  place
});

export const resetPlaces = () => ({
  type: RESET_PLACES
});


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return [...state, action.place];
      case ADD_CURRENT_LOCATION:
      return [...state, {
        place: null,
        position: action.location
      }];
    case REMOVE_PLACE:
      return state.filter(place => place.place !== action.place);
    case RESET_PLACES:
      return [];
    default: return state;
  }
};
