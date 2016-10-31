import ReactDOM from 'react-dom';

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

/*----------  THUNKS  ----------*/
export const renderAutoComplete = (google, stationMap, aref) => dispatch => {
  if (!google || !stationMap) return;
  const node = ReactDOM.findDOMNode(aref);
  let autocomplete = new google.maps.places.Autocomplete(node);
  autocomplete.bindTo('bounds', stationMap);

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    dispatch(addPlace({
      place: place,
      position: place.geometry.location
    }));

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
  console.log('the geocoder', geocoder)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log('current position',pos);
      geocoder.geocode({location: pos}, (results, status) => {
      if (status === 'OK') {
        let place = results[1];
        console.log('the place', results[1]);
        let location = place.geometry.location;
        console.log('the location', location);
        if (place) {
          dispatch(addPlace({
            place: place,
            position: place.geometry.location
          }));
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });

    });
  }
};



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
