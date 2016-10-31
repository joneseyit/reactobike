import { connect } from 'react-redux';
import StationMarker from './StationMarker';
import { initialState as noStatus } from '../../redux/stationStatus';

const mapStateToProps = ({stationStatus, stationInfo, mapMode}, {id}) => {
  let info = stationInfo.find(station => station.id === id);
  let { name, position, capacity } = info;
  let status = stationStatus.find(station => station.id === id) || noStatus;
  let { availableBikes,
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
