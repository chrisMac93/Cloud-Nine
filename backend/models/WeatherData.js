const mongoose = require("mongoose");

const WeatherDataSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    expires: 3600, // Set data to expire after 1 hour if caching
  },
});

module.exports = mongoose.model("WeatherData", WeatherDataSchema);
