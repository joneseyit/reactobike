import { connect } from 'react-redux';
import StationMap from './StationMap';
import { setStationMap } from '../../redux/stationMap';
import { setGoogle } from '../../redux/google';
import { setGeocoder } from '../../redux/geocoder';

const mapStateToProps = ({ stationInfo, places, google, stationMap }) => {
    const stations = stationInfo.map(station => station.id);
    return { stations, places, google, stationMap };
};

const mapDispatchToProps = dispatch => ({
  setStationMap: map => dispatch(setStationMap(map)),
  setGoogle: google => dispatch(setGoogle(google)),
  setGeocoder: geocoder => dispatch(setGeocoder(geocoder))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationMap);
