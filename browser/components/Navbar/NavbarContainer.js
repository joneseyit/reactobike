import { connect } from 'react-redux';
import Navbar from './Navbar';
import { toggleMapMode } from '../../redux/mapMode';
import { updateAutocomplete } from '../../redux/autocomplete';

const mapStateToProps = ({ mapMode, autocomplete }) => ({ mapMode, autocomplete });
const mapDispatchToProps = dispatch => ({
  toggleMapMode: () => dispatch(toggleMapMode()),
  updateAutocomplete: value => dispatch(updateAutocomplete(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
