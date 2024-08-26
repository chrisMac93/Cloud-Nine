const moment = require("moment");

const formatDate = (dateString) => {
  return moment(dateString).format("YYYY-MM-DD HH:mm:ss");
};

const calculateSunriseSunset = (latitude, longitude) => {
  // Logic to calculate sunrise and sunset times based on location
};

module.exports = { formatDate, calculateSunriseSunset };
