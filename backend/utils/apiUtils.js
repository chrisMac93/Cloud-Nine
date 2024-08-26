const axios = require("axios");

const fetchWeatherData = async (latitude, longitude, apiKey) => {
  try {
    const response = await axios.get(`https://api.accuweather.com/...`, {
      params: {
        lat: latitude,
        lon: longitude,
        apikey: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

module.exports = { fetchWeatherData };
