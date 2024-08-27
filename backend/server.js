const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weather');

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define Routes
app.use('/api/weather', weatherRoutes);  // Use your weather routes
app.use('/api', require('./routes/api')); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
