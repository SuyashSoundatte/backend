const express = require('express');
const router = express.Router();
const { isLoggedIn, itineraryValidationsJoi } = require('../middlewares/auth.middlewares'); 
const itineraryValidations = require('../middlewares/itineraryValidations'); 
const { createItinerary } = require('../controllers/itinerary.controller'); 

router.post('/', isLoggedIn, itineraryValidations, createItinerary);

module.exports = router;