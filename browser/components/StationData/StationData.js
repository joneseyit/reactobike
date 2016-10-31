import React, { Component } from 'react';
import { cropCoordinates } from '../../converters';


export default class Stations extends Component {
  render() {
    const { stations } = this.props;
    return (
      <div className="container">
        <h3>Station Info</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Coordinates</th>
              <th>Capacity</th>
              <th>Available Bikes</th>
              <th>Available Docks</th>
              <th>Renting</th>
              <th>Accepting</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, i) => {
              const location = cropCoordinates(station.position);
              return (
                <tr key={i}>
                  <td>{station.id}</td>
                  <td>{station.name}</td>
                  <td>{`${location.lat}, ${location.lng}`}</td>
                  <td>{station.capacity}</td>
                  <td>{station.availableBikes}</td>
                  <td>{station.availableDocks}</td>
                  <td>{station.isRenting ? 'Yes' : ''} </td>
                  <td>{station.isReturning ? 'Yes' : ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
