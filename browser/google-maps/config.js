export const API_KEY = 'AIzaSyAxlHPHrZBPgk8Vho3gc6RylhUDY1Zp1jU';

export const style = {
  width: '100%',
  height: '100%'
};

// Uncomment prop to set value
export const mapProps = {
  zoom: 20,
  initialCenter: {lat: 40.705007, lng: -74.00914},
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  scrollwheel: true,
  centeraroundcurrentlocation: false
};

export const mapStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

export const containerStyle = {
  position: 'relative',
  height: 'calc(100vh - 50px)',
  width: '100%'
};

/*----------  ICONS  ----------*/
export const bikeIcon = {
  scale: .5,
  strokeColor: 'black',
  strokeWeight: 0.5,
  fillOpacity: 1,
};

export const dockIcon = {
  scale: .5,
  strokeColor: 'black',
  strokeWeight: 0.5,
  fillOpacity: 1,
};

/*----------  PATHS  ----------*/

 const newMoon = 'M45,27c9.925,0,18,8.075,18,18c0,9.925-8.075,18-18,18c-9.925,0-18-8.075-18-18C27,35.075,35.075,27,45,27 M45,25  c-11.046,0-20,8.954-20,20s8.954,20,20,20s20-8.954,20-20S56.046,25,45,25L45,25z';
 const waningCrescent = 'M65,45c0-9.271-6.316-17.045-14.874-19.312c-0.123-0.033-0.246-0.064-0.369-0.095c-0.398-0.097-0.799-0.187-1.206-0.26   c-0.262-0.048-0.527-0.083-0.793-0.121c-0.305-0.042-0.607-0.091-0.917-0.119C46.234,25.036,45.621,25,45,25   c-11.046,0-20,8.954-20,20c0,11.045,8.954,20,20,20c0.621,0,1.233-0.035,1.84-0.093c0.312-0.028,0.616-0.077,0.924-0.12   c0.263-0.038,0.526-0.072,0.785-0.12c0.409-0.073,0.811-0.163,1.211-0.261c0.121-0.03,0.243-0.062,0.364-0.094   c0.466-0.123,0.926-0.259,1.379-0.415l0,0l0,0C59.352,61.196,65,53.766,65,45z M48.611,62.636   C42.306,59.273,38.009,52.646,38.009,45c0-7.646,4.297-14.273,10.602-17.635C56.812,29.042,63,36.312,63,45   S56.812,60.959,48.611,62.636z';
 const lastQuarter = 'M45,25c-11.046,0-20,8.954-20,20s8.954,20,20,20s20-8.954,20-20S56.046,25,45,25z M45,63V27c9.925,0,18,8.075,18,18   C63,54.925,54.925,63,45,63z';
 const waningGibbous = 'M45,25c-0.622,0-1.235,0.036-1.841,0.093c-0.308,0.028-0.609,0.077-0.914,0.119c-0.267,0.038-0.535,0.074-0.799,0.122  c-0.405,0.073-0.803,0.162-1.199,0.258c-0.126,0.032-0.252,0.063-0.378,0.098c-0.462,0.123-0.919,0.257-1.368,0.412  c-0.001,0-0.003,0.001-0.004,0.001l0,0C30.648,28.804,25,36.234,25,45c0,8.766,5.648,16.195,13.497,18.896l0,0  c0.001,0.002,0.003,0.002,0.004,0.002c0.45,0.154,0.908,0.289,1.372,0.412c0.123,0.033,0.247,0.064,0.37,0.097  c0.399,0.097,0.799,0.187,1.207,0.26c0.261,0.048,0.525,0.083,0.79,0.12c0.306,0.043,0.61,0.092,0.92,0.12  C43.766,64.965,44.378,65,45,65c11.046,0,20-8.954,20-20S56.046,25,45,25z M45,63c-0.125,0-0.25-0.001-0.375-0.004  c5.768-4.047,9.366-10.713,9.366-17.996c0-7.284-3.599-13.95-9.366-17.996C44.75,27.001,44.875,27,45,27c9.925,0,18,8.075,18,18  S54.925,63,45,63z';
const fullMoon = 'M25,45a20,20 0 1,0 40,0a20,20 0 1,0 -40,0';

/*----------  FUNCTIONS  ----------*/
const colors = {
  empty: 'red',
  low: 'yellow',
  full: 'green',
  unavailable: 'grey'
};

const paths = {
  empty: newMoon,
  low: waningCrescent,
  half: lastQuarter,
  most: waningGibbous,
  full: fullMoon
};

export const evaluateColor = counter => {
  switch (true) {
    case typeof counter !== 'number':
    case counter < 0:
      return colors.unavailable;
    case counter <= 1: return colors.empty;
    case counter <= 7: return colors.low;
    case counter > 7: return colors.full;
    default: return colors.unavailable;
  }
};

export const evaluatePath = ratio => {
  switch (true) {
    case typeof ratio !== 'number':
    case ratio <= 0:
      return paths.empty;
    case ratio <= 0.33: return paths.low;
    case ratio <= 0.67: return paths.half;
    case ratio < 1: return paths.most;
    case ratio >= 1: return paths.full;
    default: return paths.empty;
  }
};

export const evaluateScale = zoom => {
  switch (true) {
    case zoom <= 12: return 0.2;
    case zoom <= 13: return 0.3;
    case zoom <= 14: return 0.4;
    case zoom > 14: return 0.5;
    default: return 0.5;
  }
};

/*

MAP PROP TYPES

  google: _react.PropTypes.object,
  zoom: _react.PropTypes.number,                        // 0 - 21 +
  centeraroundcurrentlocation: _react.PropTypes.bool,   // true or false
  center: _react.PropTypes.object,                      // {lat, lng}
  initialCenter: _react.PropTypes.object,               // {lat, lng}
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  containerStyle: _react.PropTypes.object,
  visible: _react.PropTypes.bool,                       // true or false
  mapType: _react.PropTypes.string,
  maxZoom: _react.PropTypes.number,
  minZoom: _react.PropTypes.number,
  clickableIcons: _react.PropTypes.bool,                // true or false
  disableDefaultUI: _react.PropTypes.bool,              // true or false
  zoomControl: _react.PropTypes.bool,                   // true or false
  mapTypeControl: _react.PropTypes.bool,                // true or false
  scaleControl: _react.PropTypes.bool,                  // true or false
  streetViewControl: _react.PropTypes.bool,             // true or false
  panControl: _react.PropTypes.bool,                    // true or false
  rotateControl: _react.PropTypes.bool,                 // true or false
  scrollwheel: _react.PropTypes.bool,                   // true or false
  draggable: _react.PropTypes.bool,                     // true or false
  keyboardShortcuts: _react.PropTypes.bool,             // true or false
  disableDoubleClickZoom: _react.PropTypes.bool,        // true or false
  noClear: _react.PropTypes.bool,                       // true or false
  styles: _react.PropTypes.array

*/
