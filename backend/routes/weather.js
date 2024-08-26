// const express = require("express");
// const router = express.Router();
// const weatherController = require("../controllers/weatherController");
// const authMiddleware = require("../middleware/authMiddleware");

// // Get weather data for a specific location
// router.get("/current", authMiddleware, weatherController.getWeather);

// module.exports = router;

const express = require('express');
const { getLocationKey, getCurrentConditions } = require('../utils/apiUtils');
const router = express.Router();

router.get('/current', async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const locationKey = await getLocationKey(lat, lon);
    const currentConditions = await getCurrentConditions(locationKey);
    res.json(currentConditions);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

module.exports = router;