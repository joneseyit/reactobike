export const fitBounds = (google, map, places) => {
    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => bounds.extend(place.geometry.location));
    map.fitBounds((bounds));
    if (map.getZoom() > 19) map.setZoom(19);
};
