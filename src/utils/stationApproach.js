export function getStationApproachTarget(station, offset = [0, 0, 0]) {
  const xStopOffset = station.position[0] >= 0 ? -2 : 2;

  return [
    station.position[0] + xStopOffset,
    station.position[1] + offset[1],
    station.position[2] + offset[2],
  ];
}
