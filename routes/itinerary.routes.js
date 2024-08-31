const express = require('express');
const router = express.Router();
const { createItinerary, getItinerary, updateItinerary, deleteItinerary } = require('../controllers/itinerary.controller');

// Route to create a new itinerary
router.post('/create', createItinerary);

// Route to get an existing itinerary by ID
router.get('/get/:id', getItinerary);

// Route to update an existing itinerary by ID
router.put('/update/:id', updateItinerary);

// Route to delete an existing itinerary by ID
router.delete('/delete/:id', deleteItinerary);

module.exports = router;
