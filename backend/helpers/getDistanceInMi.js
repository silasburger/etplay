//function that takes in a set of latitudes and longitudes and returns the distance in miles
//used to calculate how far the players (who are on the way) are from the court
function getDistanceInMiles(lat1, lon1, lat2, lon2) {
  var R = 3958.8; // Radius of the earth in miles
  var dLat = degTorad(lat2 - lat1); // deg2rad below
  var dLon = degTorad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degTorad(lat1)) *
      Math.cos(degTorad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in mi
  return d;
}

//helper function that converts degrees to rads
function degTorad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = { getDistanceInMiles };
