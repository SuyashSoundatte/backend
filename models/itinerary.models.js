const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    destinations: [{ type: String, required: true }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    activities: [
      {
        date: { type: Date, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
