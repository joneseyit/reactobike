import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import { evaluateColor, evaluatePath, evaluateScale, mapProps } from '../../google-maps/config';

export default class StationMarker extends Component {
  getColor() {
    let { mapMode, availableBikes, availableDocks } = this.props;
    let counter = mapMode.mode === 'docks' ? availableDocks : availableBikes;
    return evaluateColor(counter);
  }

  getPath() {
    let { mapMode, availableBikes, availableDocks } = this.props;
    let ratio = mapMode.mode === 'docks' ?
      availableDocks / (availableDocks + availableBikes) :
      availableBikes / (availableDocks + availableBikes);
    return evaluatePath(ratio);
  }

  getIcon() {
    let { google, mapMode, map } = this.props;
    let fillColor = this.getColor();
    let path = this.getPath();
    let anchor = new google.maps.Point(64, 64);
    // let zoom = map ? map.zoom : mapProps.zoom;
    // let scale = evaluateScale(zoom);
    return Object.assign({}, mapMode.icon, { anchor, fillColor, path });
  }

  stationChanged(id, stations1, stations2) {
    let station1 = stations1 && stations1.find(station => id === station.id);
    let station2 = stations2 && stations2.find(station => id === station.id);
    if (station1 && station2 && id) {
      if (station1.availableBikes !== station2.availableBikes) {
        // console.log('bikes didnt match', id, station1.availableBikes, station2.availableBikes);
        return true;
      } else if (station1.availableDocks !== station2.availableDocks) {
        // console.log('docks didnt match', id, station1.availableDocks, station2.availableDocks);
        return true;
      }
      else return false;
    } else {
      // console.log('something\'s missing')
      return true;
    }
  }

  componentDidUpdate(prevProps) {
    let { mapMode, map, stations } = this.props;
    let marker = this.refs[`station-${this.props.id}`];
    // let prevStation = prevProps.stations && this.getStation(marker.props.id, prevProps.stations);
    // let currStation = stations && this.getStation(marker.props.id, stations);
    if (mapMode.mode !== prevProps.mapMode.mode || this.stationChanged(marker.props.id, stations, prevProps.stations)) {
      console.log(`resetting icon for ${marker.props.id}`);
        marker.marker.setIcon(this.getIcon());
      }
  }

  render() {
     let props = Object.assign({}, this.props, {icon: this.getIcon()});
     let ref = `station-${props.id}`
    return (
      <Marker ref={ref} {...props} />
    );
  }
}

Marker.propTypes = {
  icon: React.PropTypes.object
};
