import { connect } from 'react-redux';
import Navbar from './Navbar';
import { toggleMapMode, setMapMode } from '../../redux/mapMode';
import { setAutoComplete, clearAutoComplete } from '../../redux/autocomplete';

const mapStateToProps = ({ mapMode }) => ({ mapMode });
const mapDispatchToProps = dispatch => ({
  toggleMapMode: () => dispatch(toggleMapMode()),
  setMapMode: mode => dispatch(setMapMode(mode)),
  setAutoComplete: node => dispatch(setAutoComplete(node)),
  clearAutoComplete: node => dispatch(clearAutoComplete(node))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
