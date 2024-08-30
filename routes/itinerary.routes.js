const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/auth.middlewares'); // Path to your middleware
const itineraryValidations = require('../middlewares/itineraryValidations'); // Path to your validations
const createItinerary = require('../controllers/itinerary.controller').createItinerary; // Path to your controller

// Route to create a new itinerary with authentication and validation
router.post('/', isLoggedIn, itineraryValidations, createItinerary);

module.exports = router;
