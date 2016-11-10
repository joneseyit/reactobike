import ReactDOM from 'react-dom';
import store from '../store';

const initialState = {
  originPlace: null,
  destinationPlace: null,
  originStation: null,
  destinationStation: null,
  steps: []
};

/*----------  ACTION TYPES  ----------*/
const SET_ORIGIN_PLACE = 'SET_ORIGIN_PLACE';
const SET_DESTINATION_PLACE = 'SET_DESTINATION_PLACE';
const RESET_PLACES = 'RESET_PLACES';
const SET_ORIGIN_STATION = 'SET_ORIGIN_STATION';
const SET_DESTINATION_STATION = 'SET_DESTINATION_STATION';
const RESET_STATIONS = 'RESET_STATIONS';
const ADD_STEP = 'ADD_STEP';
const CLEAR_STEPS = 'CLEAR_STEPS'

/*----------  ACTION CREATORS  ----------*/
export const setOriginPlace = place => ({
  type: SET_ORIGIN_PLACE,
  place
});


export const setDestinationPlace = place => ({
  type: SET_DESTINATION_PLACE,
  place
});

export const resetPlaces = () => ({
  type: RESET_PLACES
});

export const setOriginStation = station => ({
  type: SET_ORIGIN_STATION,
  station
});


export const setDestinationStation = station => ({
  type: SET_DESTINATION_STATION,
  station
});

export const resetStations = () => ({
  type: RESET_STATIONS
});

export const addStep = step => ({
  type: ADD_STEP,
  step
});

export const clearSteps = () => ({
  type: CLEAR_STEPS
});

/*----------  THUNKS  ----------*/
export const renderAutoComplete = (google, stationMap, aref) => dispatch => {
  if (!google || !stationMap) return;
  const node = ReactDOM.findDOMNode(aref);
  const autocomplete = new google.maps.places.Autocomplete(node);
  autocomplete.bindTo('bounds', stationMap);

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;
    let { route } = store.getState();
    if (!route.originPlace) return dispatch(setOriginPlace(place));
    else if (!route.destinationPlace) return dispatch(setDestinationPlace(place));

    // dispatch(addPlace(place));

    // Autopositioning disabled due to auto-binding to places array
    // if (place.geometry.viewport) {
    //   stationMap.fitBounds(place.geometry.viewport);
    // } else {
    //   stationMap.setCenter(place.geometry.location);
    //   stationMap.setZoom(17);
    // }
  });
};

export const removeStepsFromMap = steps => dispatch => {
  steps.forEach(step => {
    step.setMap(null);
    step.setPanel(null);
  });
  dispatch(clearSteps());
  dispatch(resetPlaces());
  dispatch(resetStations());
}


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORIGIN_PLACE: return Object.assign({}, state, {originPlace: action.place});
    case SET_DESTINATION_PLACE: return Object.assign({}, state, {destinationPlace: action.place});
    case RESET_PLACES: return Object.assign({}, state, {originPlace: null, destinationPlace: null});
    case SET_ORIGIN_STATION: return Object.assign({}, state, {originStation: action.station});
    case SET_DESTINATION_STATION: return Object.assign({}, state, {destinationStation: action.station});
    case RESET_STATIONS: return Object.assign({}, state, {originStation: null, destinationStation: null});
    case ADD_STEP: return Object.assign({}, state, {steps: [...state.steps, action.step]});
    case CLEAR_STEPS: return Object.assign({}, state, {steps: []});
    default: return state;
  }
};
