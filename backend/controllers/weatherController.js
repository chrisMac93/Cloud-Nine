const axios = require("axios");
const WeatherData = require('../models/WeatherData');
const { getLocationKey, getCurrentConditions, getPollenAndAllergyOutlook, getHourlyWeather } = require('../utils/apiUtils');

// Fetch weather data for a location
exports.getWeather = async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    // Check if data is cached in MongoDB
    const cachedWeather = await WeatherData.findOne({ 'data.latitude': latitude, 'data.longitude': longitude });

    if (cachedWeather) {
      return res.json(cachedWeather.data);
    }

    // Fetch new data from API
    const locationKey = await getLocationKey(latitude, longitude);
    const currentConditions = await getCurrentConditions(locationKey);
    const pollenData = await getPollenAndAllergyOutlook(locationKey);
    const hourlyWeather = await getHourlyWeather(locationKey);
    const weatherData = {
      latitude,
      longitude,
      currentConditions,
      pollenData,
      hourlyWeather,
    };

    // Save new data to MongoDB
    const newWeatherData = new WeatherData({ data: weatherData });
    await newWeatherData.save();

    res.json(weatherData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// const { fetchWeatherData } = require('../utils/apiUtils');
// const { formatDate } = require('../utils/dateUtils');

// exports.getWeather = async (req, res) => {
//   const { latitude, longitude } = req.query;

//   try {
//     const weatherData = await fetchWeatherData(latitude, longitude, process.env.ACCUWEATHER_API_KEY);
//     const formattedData = {
//       ...weatherData,
//       formattedDate: formatDate(weatherData.date)
//     };
//     res.json(formattedData);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
