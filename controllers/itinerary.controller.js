const Itinerary = require("../models/itinerary.models");

const createItinerary = async (req, res) => {
  try {
    const { title, description, startDate, endDate, destinations } = req.body;

    if (!title || !description || !startDate || !endDate || !destinations) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItinerary = new Itinerary({
      title,
      description,
      startDate,
      endDate,
      destinations,
    });

    const savedItinerary = await newItinerary.save();

    res
      .status(201)
      .json({
        message: "Itinerary created successfully",
        data: savedItinerary,
      });
  } catch (error) {
    console.error("Error creating itinerary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createItinerary,
};
