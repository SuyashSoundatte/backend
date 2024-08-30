const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    dates: {
        type: [Date],
        required: true
    },
    activities: {
        type: [String],
        required: true
    },
    budget: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Itinerary = mongoose.model('Itinerary', ItinerarySchema);
module.exports = Itinerary;