const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");
const authMiddleware = require("../middleware/authMiddleware");

// Add a new location
router.post("/add", authMiddleware, locationController.addLocation);

// Get all locations for a user
router.get("/", authMiddleware, locationController.getLocations);

module.exports = router;
