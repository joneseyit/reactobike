import ReactDOM from 'react-dom';

const initialState = [];

/*----------  ACTION TYPES  ----------*/
const ADD_PLACE = 'ADD_PLACE';
const REMOVE_PLACE = 'REMOVE_PLACE';
const RESET_PLACES = 'RESET_PLACES';

/*----------  ACTION CREATORS  ----------*/
export const addPlace = place => ({
  type: ADD_PLACE,
  place
});


export const removePlace = place => ({
  type: REMOVE_PLACE,
  place
});

export const resetPlaces = () => ({
  type: RESET_PLACES
});

/*----------  THUNKS  ----------*/
// Adds google maps autocomplete searchbar functionality to DOM object
// Callback function adds selected place to store
export const renderAutoComplete = (google, stationMap, aref) => dispatch => {
  if (!google || !stationMap) return;
  const node = ReactDOM.findDOMNode(aref);
  const autocomplete = new google.maps.places.Autocomplete(node);
  autocomplete.bindTo('bounds', stationMap);

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    dispatch(addPlace(place));

    if (place.geometry.viewport) {
      stationMap.fitBounds(place.geometry.viewport);
    } else {
      stationMap.setCenter(place.geometry.location);
      stationMap.setZoom(17);
    }

    // let bounds = new google.maps.LatLngBounds();
    // this.props.places.forEach(place =>bounds.extend(place.position))
    // map.fitBounds((bounds));
  });
};

export const geocodeCurrentLocation = geocoder => dispatch => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      geocoder.geocode({location: pos}, (results, status) => {
      if (status === 'OK') {
        const place = results[1];
        if (place) dispatch(addPlace(place));
        else console.error('No results found');
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });

    });
  }
};

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE: return [...state, action.place];
    case REMOVE_PLACE: return state.filter(place => place !== action.place);
    case RESET_PLACES: return [];
    default: return state;
  }
};
