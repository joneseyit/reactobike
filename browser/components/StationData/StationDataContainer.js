'use strict';

import { connect } from 'react-redux';
import StationData from './StationData';
import { joinStationData } from '../../converters';


const mapStateToProps = ({ stationInfo, stationStatus }) => {
  let stations = stationInfo.map(station => joinStationData(station, stationStatus));
  return { stations };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(StationData);
