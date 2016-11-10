import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import { renderAutoComplete, resetPlaces, removeStepsFromMap } from '../../redux/route';

const mapStateToProps = ({ stationMap, google, route }) => ({ stationMap, google, route });

const mapDispatchToProps = dispatch => ({
  resetPlaces: () => dispatch(resetPlaces()),
  renderAutoComplete: (google, stationMap, aref) =>
                        dispatch(renderAutoComplete(google, stationMap, aref)),
  removeStepsFromMap: steps => dispatch(removeStepsFromMap(steps))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
