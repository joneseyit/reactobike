import { connect } from 'react-redux';
import StationMap from './StationMap';
import { loadCurrentLocation } from '../../redux/currentLocation';
import { updateStationStatus, loadStationStatus } from '../../redux/stationStatus';
import { addPlace } from '../../redux/places';

const mapStateToProps = state => {
    let { stationInfo,
          mapMode,
          autocomplete,
          currentLocation,
          places } = state;

    let stations = stationInfo.map(station => station.id);

    return {
      stations,
      mapMode,
      autocomplete,
      currentLocation,
      places
    };
};

const mapDispatchToProps = dispatch => ({
  loadCurrentLocation: () => dispatch(loadCurrentLocation()),
  updateStationStatus: () => dispatch(updateStationStatus()),
  loadStationStatus: () => dispatch(loadStationStatus()),
  addPlace: place => dispatch(addPlace(place))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationMap);
