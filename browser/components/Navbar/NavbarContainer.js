import { connect } from 'react-redux';
import Navbar from './Navbar';
import { toggleMapMode, setMapMode } from '../../redux/mapMode';
import { setAutoComplete, clearAutoComplete } from '../../redux/autocomplete';
import { loadCurrentLocation } from '../../redux/currentLocation';
import { addCurrentLocation } from '../../redux/places';

const mapStateToProps = ({ mapMode, currentLocation }) => ({ mapMode, currentLocation });
const mapDispatchToProps = dispatch => ({
  toggleMapMode: () => dispatch(toggleMapMode()),
  setMapMode: mode => dispatch(setMapMode(mode)),
  setAutoComplete: node => dispatch(setAutoComplete(node)),
  clearAutoComplete: node => dispatch(clearAutoComplete(node)),
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
