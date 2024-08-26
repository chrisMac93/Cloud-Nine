const express = require("express");
const router = express.Router();
const { getLocationKey, getCurrentConditions } = require("../utils/apiUtils");

// @route   GET api/test
// @desc    Test route
// @access  Public
router.get("/test", (req, res) => res.send("API is working"));

// @route   GET api/weather/current
// @desc    Get current weather for a location
// @access  Public
router.get("/weather/current", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    // Get the location key based on latitude and longitude
    const locationKey = await getLocationKey(lat, lon);

    // Get the current weather conditions using the location key
    const currentConditions = await getCurrentConditions(locationKey);

    // Send the current conditions as the response
    res.json(currentConditions);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

module.exports = router;
