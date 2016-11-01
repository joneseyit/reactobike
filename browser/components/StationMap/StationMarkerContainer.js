import { connect } from 'react-redux';
import StationMarker from './StationMarker';
import { initialState as noStatus } from '../../redux/stationStatus';

const mapStateToProps = ({stationStatus, stationInfo, mapMode, stationMap }, {id}) => {
  const info = stationInfo.find(station => station.id === id);
  const { name, position, capacity } = info;
  const status = stationStatus.find(station => station.id === id) || noStatus;
  const { availableBikes,
        availableDocks,
        disabledBikes,
        disabledDocks,
        isInstalled,
        isRenting,
        isReturning } = status;
  return { name,
           position,
           capacity,
           availableBikes,
           availableDocks,
           disabledBikes,
           disabledDocks,
           isInstalled,
           isRenting,
           isReturning,
           mapMode };
};

export default connect(
  mapStateToProps
)(StationMarker);
