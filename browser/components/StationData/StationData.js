import React, { Component } from 'react';

export default class Stations extends Component {
  render() {
    let { stations } = this.props;
    return (
      <div className="container">
        <h3>Station Info</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Available Bikes</th>
              <th>Available Docks</th>
              <th>Renting</th>
              <th>Accepting</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, i) => (
              <tr key={i}>
                <td>{station.id}</td>
                <td>{station.name}</td>
                <td>{station.lat}</td>
                <td>{station.lon}</td>
                <td>{station.availableBikes}</td>
                <td>{station.availableDocks}</td>
                <td>{station.isRenting ? 'Yes' : ''} </td>
                <td>{station.isReturning ? 'Yes' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
