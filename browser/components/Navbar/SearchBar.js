import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: ''};
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
  }

  onSearchChange(evt) {
    this.setState({searchInput: evt.target.value});
  }

  onResetClick() {
    this.props.resetPlaces();
    this.props.removeStepsFromMap(this.props.route.steps);
  }


  componentDidUpdate(prevProps) {
    const { stationMap, google, route } = this.props;
    if (google && stationMap && (google !== prevProps.google
        || stationMap !== prevProps.stationMap)
        || (route.originPlace !== prevProps.route.originPlace
            || route.destinationPlace !== prevProps.route.destinationPlace)) {
      this.props.renderAutoComplete(google, stationMap, this.refs.autocomplete);
      this.setState({searchInput: ''});
    }
  }

  render() {
    let { route } = this.props;
    let { searchInput } = this.state;
    let { onSearchChange, onResetClick } = this;
    return (
      <div>
        {route.originPlace && route.destinationPlace &&
          <input type="button"
                 className="btn btn-danger"
                 value="Reset Route"
                 onClick={onResetClick}/> }
        {(!route.originPlace || !route.destinationPlace) &&
          <input ref="autocomplete"
                 id="autocomplete-input"
                 type="text"
                 className="form-control"
                 onChange={onSearchChange}
                 value={searchInput}
                 placeholder={`Enter your ${route.originPlace ? 'destination' : 'origin'}`} />
        }
      </div>
      )
  }
}
