export const fitBounds = (google, map, places) => {
    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => bounds.extend(place.geometry.location));
    map.fitBounds((bounds));
    if (map.getZoom() > 17) map.setZoom(17);
};

export const calcLatLngDistance = (lat1, lng1, lat2, lng2, unit) => {
  let radlat1 = Math.PI * lat1 / 180;
  let radlat2 = Math.PI * lat2 / 180;
  let theta = lng1 - lng2;
  let radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit.toLowerCase() === 'k') { dist = dist * 1.609344; }
  if (unit.toLowerCase() === 'n') { dist = dist * 0.8684; }
  return dist;
};

export const calculateRoute = (google, map, origin, destination, travelMode, panel) => {
    let directionsService = new google.maps.DirectionsService(),
        directionsDisplay = new google.maps.DirectionsRenderer({preserveViewport: true, panel}),
        request = {origin, destination, travelMode};
    directionsDisplay.setMap(map);
    directionsService.route(request, (result, status) => {
        if (status == 'OK') {
          directionsDisplay.setDirections(result);
        }
      });
  }
