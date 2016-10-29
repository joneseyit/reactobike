const initialState = null;

/*----------  ACTION TYPES  ----------*/
const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

/*----------  ACTION CREATORS  ----------*/
export const receiveLocation = location => ({
  type: RECEIVE_LOCATION,
  location
});

/*----------  THUNKS  ----------*/
export const loadCurrentLocation = () => dispatch => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      dispatch(receiveLocation(pos));
    });
  }
};


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_LOCATION:
      return action.location;
    default: return state;
  }
};
