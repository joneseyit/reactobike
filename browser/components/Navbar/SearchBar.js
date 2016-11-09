import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onResetClick = this.onResetClick.bind(this);
  }
  onResetClick() {
    this.props.resetPlaces();
  }

  componentDidUpdate(prevProps) {
    const { stationMap, google, route } = this.props;
    if (google && stationMap && (google !== prevProps.google
        || stationMap !== prevProps.stationMap)
        || (route.originPlace !== prevProps.route.originPlace
            || route.destinationPlace !== prevProps.route.destinationPlace)) {
      this.props.renderAutoComplete(google, stationMap, this.refs.autocomplete);
      // if (!google || !stationMap) return;
      // const node = ReactDOM.findDOMNode(this.refs.autocomplete);
      // const autocomplete = new google.maps.places.Autocomplete(node);
      // autocomplete.bindTo('bounds', stationMap);

      // autocomplete.addListener('place_changed', () => {
      //   const place = autocomplete.getPlace();
      //   if (!place.geometry) return;
      //   // console.log('place', route.originPlace)
      //   // else if (!route.originPlace) store.dispatch(setOriginPlace(place));
      //   else if (!route.destinationPlace) store.dispatch(setDestinationPlace(place));

      //   // Autopositioning disabled due to auto-binding to places array
      //   // if (place.geometry.viewport) {
      //   //   stationMap.fitBounds(place.geometry.viewport);
      //   // } else {
      //   //   stationMap.setCenter(place.geometry.location);
      //   //   stationMap.setZoom(17);
      //   // }
      // })
    }
  }

  render() {
    let { route } = this.props;
    let { onResetClick } = this;
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
                 placeholder={`Enter your ${route.originPlace ? 'destination' : 'origin'}`} />
        }
      </div>
      )
  }
}
