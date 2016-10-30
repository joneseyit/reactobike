import { connect } from 'react-redux';
import Navbar from './Navbar';
import { toggleMapMode, setMapMode } from '../../redux/mapMode';
import { addPlace } from '../../redux/places';
import { loadCurrentLocation } from '../../redux/currentLocation';
import { addCurrentLocation } from '../../redux/places';

const mapStateToProps = (
  {
    mapMode,
    currentLocation,
    stationMap,
    google
  }) => ({
    mapMode,
    currentLocation,
    stationMap,
    google
  });

const mapDispatchToProps = dispatch => ({
  toggleMapMode: () => dispatch(toggleMapMode()),
  setMapMode: mode => dispatch(setMapMode(mode)),
  addPlace: place => dispatch(addPlace(place)),
  loadCurrentLocation: () => dispatch(loadCurrentLocation()),
  addCurrentLocation: location => {
    dispatch(loadCurrentLocation());
    dispatch(addCurrentLocation(location));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
