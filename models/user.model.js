const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    preferences: {
        type: Map,
        of: String,
        default: {}
    },
    savedItineraries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary'
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;