const Location = require("../models/Location");

// Add a new location
exports.addLocation = async (req, res) => {
  const { name, latitude, longitude } = req.body;

  try {
    const newLocation = new Location({
      user: req.user.id,
      name,
      latitude,
      longitude,
    });

    const location = await newLocation.save();
    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all locations for a user
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ user: req.user.id });
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// const { fetchWeatherData } = require('../utils/apiUtils');

// exports.addLocationWithWeather = async (req, res) => {
//   const { name, latitude, longitude } = req.body;

//   try {
//     const weatherData = await fetchWeatherData(latitude, longitude, process.env.ACCUWEATHER_API_KEY);

//     const newLocation = new Location({
//       user: req.user.id,
//       name,
//       latitude,
//       longitude,
//     });

//     const location = await newLocation.save();
//     res.json({ location, weatherData });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
