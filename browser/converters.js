export const convertStationInfo = station => ({
    id: parseInt(station.station_id, 10),
    name: station.name,
    position: { lat: station.lat, lng: station.lon },
    capacity: station.capacity
  });

export const convertStationStatus = station => ({
    id: parseInt(station.station_id, 10),
    availableBikes: station.num_bikes_available,
    availableDocks: station.num_docks_available,
    disabledBikes: station.num_bikes_disabled,
    disabledDocks: station.num_docks_disabled,
    isInstalled: Boolean(station.is_installed),
    isRenting: Boolean(station.is_renting),
    isReturning: Boolean(station.is_returning)
  });

export const joinStationData = (station, stationStatus) => {
  let status = stationStatus.find(status => station.id === status.id) ||
    {
      availableBikes: null,
      availableDocks: null,
      disabledBikes: null,
      disabledDocks: null,
      isInstalled: null,
      isRenting: null,
      isReturning: null
    };
  return Object.assign({}, station, status);
};

export const cropCoordinates = coordinates => ({
  lat: Math.round(coordinates.lat * 100000) / 100000,
  lng: Math.round(coordinates.lng * 100000) / 100000
});
