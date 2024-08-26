const express = require('express');
const router = express.Router();

// @route   GET api/test
// @desc    Test route
// @access  Public
router.get('/test', (req, res) => res.send('API is working'));

module.exports = router;
