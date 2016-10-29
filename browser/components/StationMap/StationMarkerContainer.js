import { connect } from 'react-redux';
import StationMarker from './StationMarker';

const mapStateToProps = ({stationStatus, stationInfo}, {id}) => {
  let info = stationInfo.find(station => station.id === id);
  let { name,
        position,
        capacity } = info;
  let status = stationStatus.find(station => station.id === id);
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
           isReturning };
};

export default connect(
  mapStateToProps
)(StationMarker);
