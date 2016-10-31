import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class SearchBar extends Component {
  componentDidUpdate(prevProps) {
    const { stationMap, google } = this.props;
    if (stationMap !== prevProps.stationMap) {
      if (!google || !stationMap) return;
      this.props.renderAutoComplete(google, stationMap, this.refs.autocomplete);
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
