const hasStatus = (info, statusDetails) => (
 Boolean(statusDetails.find(status => info.station_id === status.station_id && status.is_installed))
  );

export const convertStations = (infoDetails, statusDetails) => {
  return infoDetails.filter(info => hasStatus(info, statusDetails))
    .map(info => {
    let status = statusDetails.find(compareStatus => info.station_id === compareStatus.station_id);
    let id = parseInt(info.station_id, 10);
    let { name, lat, lon, capacity } = info;
    let availableBikes = status.num_bikes_available,
        availableDocks = status.num_docks_available,
        isInstalled = Boolean(status.is_installed),
        isRenting = Boolean(status.is_renting),
        isReturning = Boolean(status.is_returning);

    return {
      id,
      name,
      lat,
      lon,
      capacity,
      availableBikes,
      availableDocks,
      isInstalled,
      isRenting,
      isReturning
    };
  });
};
