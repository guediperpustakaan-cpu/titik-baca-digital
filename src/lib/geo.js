export const TARGET_COORDS = { lat: -2.9901, lon: 104.7567 }
export const MAX_RADIUS_METERS = 300

export function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371e3
  const toRad = (deg) => (deg * Math.PI) / 180
  const phi1 = toRad(lat1)
  const phi2 = toRad(lat2)
  const dPhi = toRad(lat2 - lat1)
  const dLambda = toRad(lon2 - lon1)

  const a =
    Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) * Math.sin(dLambda / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

export function distanceToTarget(lat, lon) {
  return haversine(lat, lon, TARGET_COORDS.lat, TARGET_COORDS.lon)
}
