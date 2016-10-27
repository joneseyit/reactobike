import React, { Component } from 'react';
import { Marker } from 'google-maps-react';

export default class MarkerWrapper extends Component {
  constructor(props) {
    super(props);
    // this.updateIcon = this.updateIcon.bind(this);
  }



  componentDidMount() {

  }

  getColor() {
    let { mapMode, availableBikes, availableDocks } = this.props;
    let colorCounter = mapMode.mode === 'docks' ? availableDocks : availableBikes;
    return colorCounter <= 1 ? 'red' :
                colorCounter <= 7  ? 'yellow' : 'green';
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
    return (
      <Marker ref="marker" {...this.props} />
    );
  }
}

Marker.propTypes = {
  icon: React.PropTypes.object
};
