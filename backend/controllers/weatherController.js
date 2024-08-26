const axios = require("axios");

// Fetch weather data for a location
exports.getWeather = async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const response = await axios.get(`https://api.accuweather.com/...`, {
      params: {
        lat: latitude,
        lon: longitude,
        apikey: process.env.ACCUWEATHER_API_KEY,
      },
    });

    res.json(response.data);
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
