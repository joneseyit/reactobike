import { connect } from 'react-redux';
import StationMap from './StationMap';
import { loadCurrentLocation } from '../../redux/currentLocation';
import { updateStationFeed } from '../../redux/stations';
import { addPlace, removePlace } from '../../redux/places';

const mapStateToProps = ({ stations, mapMode, autocomplete, currentLocation, places }) => ({
  stations,
  mapMode,
  autocomplete,
  currentLocation,
  places
});

const mapDispatchToProps = dispatch => ({
  loadCurrentLocation: () => dispatch(loadCurrentLocation()),
  updateStationFeed: () => dispatch(updateStationFeed()),
  addPlace: place => dispatch(addPlace(place))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationMap);
