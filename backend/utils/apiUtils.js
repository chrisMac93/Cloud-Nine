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
          details: true, // Include additional details like air quality
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current conditions:", error);
    throw error;
  }
};

// Function to get daily forecast with sun and moon data
// const getDailyForecastWithSunMoon = async (locationKey) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/forecasts/v1/daily/1day/${locationKey}`,
//       {
//         params: {
//           apikey: ACCUWEATHER_API_KEY,
//           details: true, // Include sun and moon data
//         },
//       }
//     );
//     return response.data.DailyForecasts[0]; // Extract the first (and only) day forecast
//   } catch (error) {
//     console.error(
//       "Error fetching daily forecast with sun and moon data:",
//       error
//     );
//     throw error;
//   }
// };

// Function to get air quality using locationKey
// const getAirQuality = async (locationKey) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/currentconditions/v1/${locationKey}`,
//       {
//         params: {
//           apikey: ACCUWEATHER_API_KEY,
//           details: true, // Air quality is included in details
//         },
//       }
//     );
//     // Assuming air quality data is part of the response
//     return response.data[0].AirAndPollen.find(
//       (metric) => metric.Name === "Air Quality"
//     );
//   } catch (error) {
//     console.error("Error fetching air quality data:", error);
//     throw error;
//   }
// };

// Function to get pollen and allergy outlook using indices API
const getPollenAndAllergyOutlook = async (locationKey) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/indices/v1/daily/1day/${locationKey}/groups/30`,
      {
        params: {
          apikey: ACCUWEATHER_API_KEY,
          details: true,
        },
      }
    );
    return response.data; // Extract the first (and only) day's pollen data
  } catch (error) {
    console.error("Error fetching pollen and allergy outlook:", error);
    throw error;
  }
};

module.exports = {
  getLocationKey,
  getCurrentConditions,
  // getDailyForecastWithSunMoon,
  // getAirQuality,
  getPollenAndAllergyOutlook,
};
