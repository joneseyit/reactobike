export const fitBounds = (google, map, places) => {
    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => bounds.extend(place.geometry.location));
    console.log(bounds);
    map.fitBounds((bounds));
};
