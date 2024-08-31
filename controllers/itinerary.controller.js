const Itinerary = require('../models/itinerary.models');

// Create a new itinerary
const createItinerary = async (req, res) => {
    try {
        const itinerary = new Itinerary(req.body);
        await itinerary.save();
        res.status(201).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: 'Error creating itinerary', error });
    }
};

// Get an existing itinerary by ID
const getItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving itinerary', error });
    }
};

// Update an existing itinerary by ID
const updateItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: 'Error updating itinerary', error });
    }
};

// Delete an existing itinerary by ID
const deleteItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json({ message: 'Itinerary deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting itinerary', error });
    }
};

module.exports = {
    createItinerary,
    getItinerary,
    updateItinerary,
    deleteItinerary,
};
