import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import { evaluateColor, evaluatePath, evaluateScale, mapProps } from './config';

export default class MarkerWrapper extends Component {
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

  componentDidUpdate(prevProps) {
    let { mapMode, map } = this.props;
    let { marker } = this.refs;
    let zoom = map ? map.zoom : mapProps.zoom;
    if (mapMode.mode !== prevProps.mapMode.mode
        || prevProps.map && prevProps.map.zoom !== map.zoom) {
      marker.marker.setIcon(this.getIcon());
    }
  }

  render() {
     let props = Object.assign({}, this.props, {icon: this.getIcon()});
    return (
      <Marker ref="marker" {...props} />
    );
  }
}

Marker.propTypes = {
  icon: React.PropTypes.object
};
