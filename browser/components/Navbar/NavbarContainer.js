import { connect } from 'react-redux';
import Navbar from './Navbar';
import { toggleMapMode } from '../../redux/mapMode';

const mapStateToProps = ({ mapMode }) => ({ mapMode });
const mapDispatchToProps = dispatch => ({
  toggleMapMode: () => dispatch(toggleMapMode())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
