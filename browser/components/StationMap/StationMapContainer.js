import React from 'react';
import { connect } from 'react-redux';
import StationMap from './StationMap';

const mapStateToProps = ({ stations, mapMode }) => ({
  stations,
  mapMode
});

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationMap)
