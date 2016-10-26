import React, { Component } from 'react';
import Map, { GoogleApiWrapper } from 'google-maps-react';
import { API_KEY, style } from '../../google-maps/config';

class Container extends Component {
  render() {
    if (!this.props.loaded) {
      return (
          <div>Loading...</div>
        );
    } else {
      return (
          <Map google={this.props.google}
            style={{width: '100%', height: '100%', position: 'relative'}}
            className={'map'}
            zoom={14}
            containerStyle={{position: 'relative', height: '90vh', width: '100%'}}
            centerAroundCurrentLocation={true}
          />
        );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY,
  containerStyle: {height: '100%', width: '100%'}
})(Container);
