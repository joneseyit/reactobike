import { connect } from 'react-redux';
import LocationButton from './LocationButton';
import { geocodeCurrentLocation } from '../../redux/places';

const mapStateToProps = ({ geocoder }) => ({ geocoder });

const mapDispatchToProps = dispatch => ({
  geocodeCurrentLocation: geocoder => dispatch(geocodeCurrentLocation(geocoder))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationButton);
