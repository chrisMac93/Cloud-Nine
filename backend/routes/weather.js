const express = require("express");
const {
  getLocationKey,
  getCurrentConditions,
  getDailyForecastWithSunMoon,
  getAirQuality,
  getPollenAndAllergyOutlook,
} = require("../utils/apiUtils");
const router = express.Router();

// Route to get current weather conditions
router.get("/current", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const locationKey = await getLocationKey(lat, lon);
    const currentConditions = await getCurrentConditions(locationKey);
    res.json(currentConditions);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

// Route to get daily forecast with sun and moon data
// router.get("/sunmoon", async (req, res) => {
//   const { lat, lon } = req.query;

//   try {
//     const locationKey = await getLocationKey(lat, lon);
//     const sunMoonData = await getDailyForecastWithSunMoon(locationKey);
//     res.json(sunMoonData);
//   } catch (error) {
//     res.status(500).json({ error: "Unable to fetch sun and moon data" });
//   }
// });

// Route to get air quality data
router.get("/airquality", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const locationKey = await getLocationKey(lat, lon);
    const airQualityData = await getAirQuality(locationKey);
    res.json(airQualityData);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch air quality data" });
  }
});

// Route to get pollen and allergy outlook
router.get("/pollen", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const locationKey = await getLocationKey(lat, lon);
    const pollenData = await getPollenAndAllergyOutlook(locationKey);
    res.json(pollenData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to fetch pollen and allergy outlook" });
  }
});

module.exports = router;
