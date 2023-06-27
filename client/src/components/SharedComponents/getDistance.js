const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export default (start, end) => { // Expects array 'lat,lng'
  console.log(start, end);
  const startCoords = start.split(',');
  const endCoords = end.split(',');
  const startLatRad = degreesToRadians(startCoords[0]);
  const endLatRad = degreesToRadians(endCoords[0]);
  const lngDiffRad = degreesToRadians(endCoords[1] - startCoords[1]);

  const kilometers = Math.acos(Math.sin(startLatRad) * Math.sin(endLatRad) + Math.cos(startLatRad) * Math.cos(endLatRad) * Math.cos(lngDiffRad)) * 6371;
  const miles = kilometers * 0.621371;

  return Math.floor(miles);
};
