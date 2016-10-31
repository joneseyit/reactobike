import React, { Component } from 'react';

export default class SearchBar extends Component {
  componentDidUpdate(prevProps) {
    const { stationMap, google, renderAutoComplete } = this.props;
    if (stationMap !== prevProps.stationMap) {
      if (!google || !stationMap) return;
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
