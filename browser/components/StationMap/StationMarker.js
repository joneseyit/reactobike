import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import { evaluateColor, evaluatePath } from '../../google-maps/icons';

export default class StationMarker extends Component {
  getColor() {
    let { mapMode,
          availableBikes,
          availableDocks} = this.props;

    let counter = mapMode.mode === 'docks' ? availableDocks : availableBikes;

    return evaluateColor(counter);
  }

  getPath() {
    let { mapMode,
          availableBikes,
          availableDocks,
          capacity } = this.props;

    let ratio = mapMode.mode === 'docks' ?
      (availableDocks / capacity) :
      (availableBikes / capacity);

    return evaluatePath(ratio);
  }

  getIcon() {
    let { google, mapMode } = this.props;
    let fillColor = this.getColor();
    let path = this.getPath();
    let anchor = new google.maps.Point(64, 64);

    return Object.assign({}, mapMode.icon, { anchor, fillColor, path });
  }

  stationChanged(prev) {
    let prevBikes = prev && prev.availableBikes;
    let prevDocks = prev && prev.availableDocks;
    let currBikes = this.props.availableBikes;
    let currDocks = this.props.availableDocks;

    if (prevBikes !== currBikes || prevDocks !== currDocks) return true;
    else return false;
  }

  componentDidUpdate(prevProps) {
    let { mapMode, id } = this.props;
    let stationMarker = this.refs[`station-${id}`];
    let changed = this.stationChanged(prevProps);

    if (mapMode.mode !== prevProps.mapMode.mode || changed) {
      stationMarker.marker.setIcon(this.getIcon());
    }
  }

  render() {
    let props = Object.assign({}, this.props, {icon: this.getIcon()});
    let ref = `station-${props.id}`;

    return ( <Marker ref={ref} {...props} /> );
  }
}

Marker.propTypes = {
  icon: React.PropTypes.object
};
