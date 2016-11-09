import React, { Component } from 'react';
import { Marker } from 'google-maps-react';

export default class PlaceMarker extends Component {
  render() {
    let { ref, position, onClick } = this.props;
    return ( <Marker ref={ref}
                     position={position}
                     onClick={onClick}
                     optimized={false}
                     zIndex={9999}/> );
  }
}
