import React from 'react';
import { connect } from 'react-redux';
import StationMap from './StationMap';

const mapStateToProps = ({ stations, mapMode, autocomplete }) => ({
  stations,
  mapMode,
  autocomplete
});

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationMap)
