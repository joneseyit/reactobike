import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import { addPlace } from '../../redux/places';
import { renderAutoComplete } from '../../redux/stationMap';

const mapStateToProps = ({ stationMap, google }) => ({ stationMap, google });

const mapDispatchToProps = dispatch => ({
  addPlace: place => dispatch(addPlace(place)),
  renderAutoComplete: (google, stationMap, aref) =>
                        dispatch(renderAutoComplete(google, stationMap, aref))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
