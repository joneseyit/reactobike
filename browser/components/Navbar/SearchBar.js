import React, { Component } from 'react';

export default class SearchBar extends Component {
  componentDidUpdate(prevProps) {
    const { stationMap, google, renderAutoComplete } = this.props;
    if (google && stationMap && (google !== prevProps.google || stationMap !== prevProps.stationMap)) {
      renderAutoComplete(google, stationMap, this.refs.autocomplete);
    }
  }

  render() {
    return (
      <input ref="autocomplete"
             id="autocomplete-input"
             type="text"
             className="form-control"
             placeholder="Enter a location..." />
    );
  }
}
