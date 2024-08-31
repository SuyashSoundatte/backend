const Itinerary = require("../models/itinerary.models");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
/*

const jwtToken = jwt.sign(
                    { email: user.email, _id: user._id },
                    process.env.JWT_SEC,
                    { expiresIn: "24h" }
                );

                */
// Create a new itinerary
const createItinerary = async (req, res) => {
    try {
        const { title, description, startDate, endDate, destinations } =
            req.body;

        if (!title || !description || !startDate || !endDate || !destinations) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const token = req.cookies.token;
        console.log(req.cookies);
        if (!token) {
            return res.status(401).json({ status: "Token missing or invalid" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SEC);
        } catch (err) {
            return res
                .status(401)
                .json({ status: "Authentication error, please sign in again" });
        }

        const foundUser = await User.findOne({ email: decoded.email });
        if (!foundUser) {
            return res.status(404).json({ status: "User not found" });
        }

        const newItinerary = new Itinerary({
            userId: foundUser._id,
            title,
            description,
            startDate,
            endDate,
            destinations,
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
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving itinerary", error });
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
    createItinerary,
    getItinerary,
    updateItinerary,
    deleteItinerary,
};
