import React, { Component } from 'react';

export default class LocationButton extends Component {
  render() {
    const { geocoder, geocodeCurrentLocation } = this.props;
    return (
      <button type="submit"
        className="btn btn-default navbar-btn"
        name="current-location"
        onClick={() => geocodeCurrentLocation(geocoder)}>Current Location</button>
    );
  }
}
