export const API_KEY = 'AIzaSyAxlHPHrZBPgk8Vho3gc6RylhUDY1Zp1jU';

export const style = {
  width: '100%',
  height: '100%'
};

// Uncomment prop to set value
export const mapProps = {
  zoom: 12,
  initialCenter: {lat: 40.7375, lng: -74.000},
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  scrollwheel: true,
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
  path: 3,
  scale: 3,
  strokeColor: 'black',
  strokeWeight: 0.5,
  fillOpacity: 1,
};

export const dockIcon = {
  path: 1,
  scale: 3,
  strokeColor: 'black',
  strokeWeight: 0.5,
  fillOpacity: 1,
};

const colors = {
  empty: 'red',
  low: 'yellow',
  full: 'green',
  unavailable: 'grey'
};

/*----------  FUNCTIONS  ----------*/
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


/*

PROP TYPES

  google: _react.PropTypes.object,
  zoom: _react.PropTypes.number,                        // 0 - 21 +
  centerAroundCurrentLocation: _react.PropTypes.bool,   // true or false
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
