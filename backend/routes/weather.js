const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");
const authMiddleware = require("../middleware/authMiddleware");

// Get weather data for a specific location
router.get("/current", authMiddleware, weatherController.getWeather);

module.exports = router;
