const Itinerary = require('../models/itinerary.models'); // Path to your Itinerary model

const createItinerary = async (req, res) => {
    try {
        const { title, description, startDate, endDate, destinations } = req.body;

        // Validate request body
        if (!title || !description || !startDate || !endDate || !destinations) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new itinerary instance
        const newItinerary = new Itinerary({
            title,
            description,
            startDate,
            endDate,
            destinations
        });

        // Save the itinerary to the database
        const savedItinerary = await newItinerary.save();

        res.status(201).json({ message: 'Itinerary created successfully', data: savedItinerary });
    } catch (error) {
        console.error('Error creating itinerary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createItinerary
};
