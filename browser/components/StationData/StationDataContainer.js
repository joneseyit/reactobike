'use strict';

import { connect } from 'react-redux';
import StationData from './StationData';
import { receiveStations } from '../../redux/stations';


const mapStateToProps = ({ stations }) => ({ stations });
const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(StationData);
