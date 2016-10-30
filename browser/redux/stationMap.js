import ReactDOM from 'react-dom';
import { addPlace } from './places';

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
