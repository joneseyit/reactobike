import React, { Component } from 'react';
import { Marker } from 'google-maps-react';

export default class PlaceMarker extends Component {
  render() {
    const ref = `place-${this.props.idx}`;
    return ( <Marker ref={ref} {...this.props} optimized={false} zIndex={9999}/> );
  }
}
