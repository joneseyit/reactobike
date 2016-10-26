'use strict';

import { connect } from 'react-redux';
import Stations from './Stations';
import { receiveStations } from '../../redux/stations';


const mapStateToProps = ({ stations }) => ({ stations });
const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Stations);
