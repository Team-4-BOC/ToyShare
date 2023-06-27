export default (start, end) => { // Expects {lat, lng}
  const kilometers = Math.acos(Math.sin(start.lat) * Math.sin(end.lat) + Math.cos(start.lat) * Math.cos(end.lat) * Math.cos(end.lng - start.lng)) * 6371;
  const miles = kilometers * 0.621371;
  return miles;
};
