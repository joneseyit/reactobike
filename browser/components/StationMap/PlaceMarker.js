import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import { starIcon } from '../../google-maps/icons';

export default class PlaceMarker extends Component {
  componentDidMount() {
    console.log('the ref', this.refs.marker);
  }
  render() {
    let { ref, position, onClick, place } = this.props;
    let anchor = new google.maps.Point(32, 32);
    let icon = Object.assign(starIcon, {anchor});
    let props = Object.assign({}, this.props, {icon});
    console.log('the position', position);
    console.log('the icon', starIcon);
    return ( <Marker ref='marker'
                     {...props}
                     position={position}
                     onClick={onClick}
                     optimized={false}
                     zIndex={9999}/> );
  }
}
