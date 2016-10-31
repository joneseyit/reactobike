import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import { stationIcon, evaluateColor, evaluatePath } from '../../google-maps/icons';

export default class StationMarker extends Component {
  // Get color of icon based on station status
  getColor() {
    let { mapMode,
          availableBikes,
          availableDocks} = this.props;

    let counter = mapMode.mode === 'docks' ? availableDocks : availableBikes;

    return evaluateColor(counter);
  }

  // Get SVG path of icon based on station status
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

  // Get icon object for marker based on station status
  getIcon() {
    let { google, mapMode } = this.props;
    let fillColor = this.getColor();
    let path = this.getPath();
    let anchor = new google.maps.Point(64, 64);

    return Object.assign({}, stationIcon, { anchor, fillColor, path });
  }

  // Evaluate whether station status has changed
  statusChanged(prev) {
    let prevBikes = prev && prev.availableBikes;
    let prevDocks = prev && prev.availableDocks;
    let currBikes = this.props.availableBikes;
    let currDocks = this.props.availableDocks;

    if (prevBikes !== currBikes || prevDocks !== currDocks) return true;
    else return false;
  }

  // Determine whether icon should be reset based on map mode change or station status change
  componentDidUpdate(prevProps) {
    let { mapMode, id } = this.props;
    let stationMarker = this.refs[`station-${id}`];
    let statusChanged = this.statusChanged(prevProps);

    if (mapMode.mode !== prevProps.mapMode.mode || statusChanged) {
      stationMarker.marker.setIcon(this.getIcon());
    }
  }

  render() {
    // Add icon to props to be passed down to marker
    let props = Object.assign({}, this.props, {icon: this.getIcon()});

    // Add reference to marker in order to reset icon when necessary
    let ref = `station-${props.id}`;

    return ( <Marker ref={ref} {...props} /> );
  }
}

// Change icon prop type to object (default is string)
Marker.propTypes = {
  icon: React.PropTypes.object
};
