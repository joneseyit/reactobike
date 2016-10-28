import { connect } from 'react-redux';
import Navbar from './Navbar';
import { toggleMapMode } from '../../redux/mapMode';
import { setAutoComplete, clearAutoComplete } from '../../redux/autocomplete';

const mapStateToProps = ({ mapMode }) => ({ mapMode });
const mapDispatchToProps = dispatch => ({
  toggleMapMode: () => dispatch(toggleMapMode()),
  setAutoComplete: node => dispatch(setAutoComplete(node)),
  clearAutoComplete: node => dispatch(clearAutoComplete(node))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
