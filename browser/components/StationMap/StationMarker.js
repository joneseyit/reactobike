import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import { stationIcon, evaluateColor, evaluatePath } from '../../google-maps/icons';

export default class StationMarker extends Component {
  // Get color of icon based on station status
  getColor() {
    const { mapMode,
          availableBikes,
          availableDocks} = this.props;

    const counter = mapMode === 'docks' ? availableDocks : availableBikes;

    return evaluateColor(counter);
  }

  // Get SVG path of icon based on station status
  getPath() {
    const { mapMode,
          availableBikes,
          availableDocks,
          capacity } = this.props;

    const ratio = mapMode === 'docks' ?
      (availableDocks / capacity) :
      (availableBikes / capacity);

    return evaluatePath(ratio);
  }

  // Get icon object for marker based on station status
  getIcon() {
    const { google } = this.props;
    const fillColor = this.getColor();
    const path = this.getPath();
    const anchor = new google.maps.Point(64, 64);

    return Object.assign({}, stationIcon, { anchor, fillColor, path });
  }

  // Evaluate whether station status has changed
  statusChanged(prev) {
    const prevBikes = prev && prev.availableBikes;
    const prevDocks = prev && prev.availableDocks;
    const currBikes = this.props.availableBikes;
    const currDocks = this.props.availableDocks;

    if (prevBikes !== currBikes || prevDocks !== currDocks) return true;
    else return false;
  }

  // Determine whether icon should be reset based on map mode change or station status change
  componentDidUpdate(prevProps) {
    const { mapMode, id } = this.props;
    const stationMarker = this.refs[`station-${id}`];
    const statusChanged = this.statusChanged(prevProps);

    if (mapMode !== prevProps.mapMode || statusChanged) {
      stationMarker.marker.setIcon(this.getIcon());
    }
  }

  render() {
    // Add icon to props to be passed down to marker
    const props = Object.assign({}, this.props, {icon: this.getIcon()});

    // Add reference to marker in order to reset icon when necessary
    const ref = `station-${props.id}`;

    return ( <Marker ref={ref} {...props} /> );
  }
}

// Change icon prop type to object (default is string)
Marker.propTypes = {
  icon: React.PropTypes.object
};
