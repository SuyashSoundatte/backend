const User = require("../models/user.model"); // Assuming you have a User model
const Itinerary = require("../models/itinerary.models");

// Create a new itinerary
const createItinerary = async (req, res) => {
    try {
        const { title, description, startDate, endDate, destinations, userId } = req.body;

        if (!title || !description || !startDate || !endDate || !destinations || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newItinerary = new Itinerary({
            title,
            description,
            startDate,
            endDate,
            destinations,
            userId,
        });

        const savedItinerary = await newItinerary.save();

        res.status(201).json({
            message: "Itinerary created successfully",
            data: savedItinerary,
        });
    } catch (error) {
        console.error("Error creating itinerary:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get an existing itinerary by ID
const getItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        console.log("Retrieved userId from itinerary:", itinerary.userId); // Log the userId

        const user = await User.findById(itinerary.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ itinerary, user });
    } catch (error) {
        console.error("Error retrieving itinerary or user:", error); // Log the error
        res.status(500).json({ message: "Error retrieving itinerary or user", error });
    }
};
// Update an existing itinerary by ID
const updateItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: "Error updating itinerary", error });
    }
};

// Delete an existing itinerary by ID
const deleteItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }
        res.status(200).json({ message: "Itinerary deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting itinerary", error });
    }
};

module.exports = {
    createItinerary,
    getItinerary,
    updateItinerary,
    deleteItinerary,
};