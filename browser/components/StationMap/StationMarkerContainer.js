import { connect } from 'react-redux';
import StationMarker from './StationMarker';

const mapStateToProps = ({stations}) => ({stations});

export default connect(
  mapStateToProps
)(StationMarker);
