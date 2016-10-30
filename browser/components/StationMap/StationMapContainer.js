import { connect } from 'react-redux';
import StationMap from './StationMap';
import { loadCurrentLocation } from '../../redux/currentLocation';
import { renderAutoComplete } from '../../redux/stationMap';
import { setStationMap } from '../../redux/stationMap';
import { setGoogle } from '../../redux/google';
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
  addPlace: place => dispatch(addPlace(place)),
  renderAutoComplete: (google, map, ref) => dispatch(renderAutoComplete(google, map, ref)),
  setStationMap: map => dispatch(setStationMap(map)),
  setGoogle: google => dispatch(setGoogle(google))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationMap);
