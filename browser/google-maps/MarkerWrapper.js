import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import { evaluateColor } from './config';

export default class MarkerWrapper extends Component {
  getColor() {
    let { mapMode, availableBikes, availableDocks } = this.props;
    let counter = mapMode.mode === 'docks' ? availableDocks : availableBikes;
    return evaluateColor(counter);
  }

  getIcon() {
    return Object.assign({}, this.props.mapMode.icon, {fillColor: this.getColor()});
  }

  componentDidUpdate(prevProps) {
    if (this.props.mapMode.mode !== prevProps.mapMode.mode) {
      this.refs.marker.marker.setIcon(this.getIcon());
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
