import * as styles from './mapStyles';

/*----------  MAP PROPS  ----------*/
export const stationMapProps = {
  zoom: 13,
  initialCenter: { lat: 40.725, lng: -74.000 },
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  scrollwheel: true,
  centeraroundcurrentlocation: true,
  styles: styles.mutedBlue,
};

export const stationMapStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

export const stationMapContainerStyle = {
  position: 'relative',
  height: 'calc(100vh - 50px)',
  width: '100%'
};


/*----------  AVAILABLE MAP PROP TYPES  ----------*/
/*

  google: _react.PropTypes.object,
  zoom: _react.PropTypes.number,
  centeraroundcurrentlocation: _react.PropTypes.bool,
  center: _react.PropTypes.object,
  initialCenter: _react.PropTypes.object,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  containerStyle: _react.PropTypes.object,
  visible: _react.PropTypes.bool,
  mapType: _react.PropTypes.string,
  maxZoom: _react.PropTypes.number,
  minZoom: _react.PropTypes.number,
  clickableIcons: _react.PropTypes.bool,
  disableDefaultUI: _react.PropTypes.bool,
  zoomControl: _react.PropTypes.bool,
  mapTypeControl: _react.PropTypes.bool,
  scaleControl: _react.PropTypes.bool,
  streetViewControl: _react.PropTypes.bool,
  panControl: _react.PropTypes.bool,
  rotateControl: _react.PropTypes.bool,
  scrollwheel: _react.PropTypes.bool,
  draggable: _react.PropTypes.bool,
  keyboardShortcuts: _react.PropTypes.bool,
  disableDoubleClickZoom: _react.PropTypes.bool,
  noClear: _react.PropTypes.bool,
  styles: _react.PropTypes.array

*/
