const axios = require("axios");

const ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY;
const BASE_URL = "http://dataservice.accuweather.com";

// Function to get locationKey based on latitude and longitude
const getLocationKey = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/locations/v1/cities/geoposition/search`,
      {
        params: {
          apikey: ACCUWEATHER_API_KEY,
          q: `${latitude},${longitude}`,
        },
      }
    );
    return response.data.Key; // Extract and return the locationKey
  } catch (error) {
    console.error("Error fetching location key:", error);
    throw error;
  }
};

// Function to get current weather conditions using locationKey
const getCurrentConditions = async (locationKey) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/currentconditions/v1/${locationKey}`,
      {
        params: {
          apikey: ACCUWEATHER_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current conditions:", error);
    throw error;
  }
};

module.exports = {
  getLocationKey,
  getCurrentConditions,
};
