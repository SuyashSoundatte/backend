const User = require("../models/user.model");
const Itinerary = require("../models/itinerary.models");
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
        const { title, description, startDate, endDate, destinations, userId } =
            req.body;

        if (
            !title ||
            !description ||
            !startDate ||
            !endDate ||
            !destinations ||
            !userId
        ) {
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

        const user = await User.findById(itinerary.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ itinerary, user });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving itinerary or user",
            error,
        });
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

const getSuggestItineraries = (req, res) => {
    const userPreferences = req.body.preferences; //"hills"
    const itineraries = suggestItineraries(userPreferences);
    return res.json(itineraries);
};

function suggestItineraries(preferences) {
    const places = {
        hills: [
            {
                name: "Shimla",
                country: "India",
                activities: ["Trekking", "Sightseeing"],
            },
            {
                name: "Ooty",
                country: "India",
                activities: ["Boating", "Tea Gardens"],
            },
            {
                name: "Darjeeling",
                country: "India",
                activities: ["Toy Train Ride", "Tea Estates"],
            },
            {
                name: "Manali",
                country: "India",
                activities: ["Paragliding", "River Rafting"],
            },
            {
                name: "Nainital",
                country: "India",
                activities: ["Boating", "Cable Car Ride"],
            },
            {
                name: "Mussoorie",
                country: "India",
                activities: ["Trekking", "Sightseeing"],
            },
            {
                name: "Coorg",
                country: "India",
                activities: ["Coffee Plantations", "Trekking"],
            },
        ],
        mountains: [
            {
                name: "Mount Everest",
                country: "Nepal",
                activities: ["Climbing", "Hiking"],
            },
            {
                name: "Rocky Mountains",
                country: "USA",
                activities: ["Hiking", "Skiing"],
            },
            {
                name: "Swiss Alps",
                country: "Switzerland",
                activities: ["Skiing", "Snowboarding"],
            },
            {
                name: "Andes",
                country: "South America",
                activities: ["Trekking", "Mountaineering"],
            },
            {
                name: "Himalayas",
                country: "India",
                activities: ["Trekking", "Mountaineering"],
            },
            {
                name: "Mount Fuji",
                country: "Japan",
                activities: ["Climbing", "Photography"],
            },
            {
                name: "Atlas Mountains",
                country: "Morocco",
                activities: ["Hiking", "Camping"],
            },
        ],
        cold: [
            {
                name: "Reykjavik",
                country: "Iceland",
                activities: ["Northern Lights", "Glacier Tours"],
            },
            {
                name: "Siberia",
                country: "Russia",
                activities: ["Snowboarding", "Ice Fishing"],
            },
            {
                name: "Alaska",
                country: "USA",
                activities: ["Dog Sledding", "Glacier Tours"],
            },
            {
                name: "Lapland",
                country: "Finland",
                activities: ["Reindeer Sledding", "Aurora Watching"],
            },
            {
                name: "Greenland",
                country: "Greenland",
                activities: ["Iceberg Tours", "Kayaking"],
            },
            {
                name: "Antarctica",
                country: "Antarctica",
                activities: ["Ice Climbing", "Wildlife Watching"],
            },
            {
                name: "Tromsø",
                country: "Norway",
                activities: ["Aurora Watching", "Snowshoeing"],
            },
        ],
        desert: [
            {
                name: "Sahara Desert",
                country: "Africa",
                activities: ["Camel Riding", "Sand Dunes"],
            },
            {
                name: "Thar Desert",
                country: "India",
                activities: ["Camel Safari", "Desert Camping"],
            },
            {
                name: "Gobi Desert",
                country: "Mongolia",
                activities: ["Nomadic Culture", "Desert Trekking"],
            },
            {
                name: "Atacama Desert",
                country: "Chile",
                activities: ["Stargazing", "Salt Flats"],
            },
            {
                name: "Arabian Desert",
                country: "Saudi Arabia",
                activities: ["Desert Safari", "Sandboarding"],
            },
            {
                name: "Sonoran Desert",
                country: "USA",
                activities: ["Desert Hiking", "Wildlife Watching"],
            },
            {
                name: "Kalahari Desert",
                country: "Botswana",
                activities: ["Wildlife Safari", "Bush Walks"],
            },
        ],
        heritage: [
            {
                name: "Machu Picchu",
                country: "Peru",
                activities: ["Historical Tours", "Photography"],
            },
            {
                name: "Great Wall of China",
                country: "China",
                activities: ["Walking Tours", "History Exploration"],
            },
            {
                name: "Pyramids of Giza",
                country: "Egypt",
                activities: ["Camel Riding", "Historical Tours"],
            },
            {
                name: "Taj Mahal",
                country: "India",
                activities: ["Photography", "Cultural Tours"],
            },
            {
                name: "Colosseum",
                country: "Italy",
                activities: ["Historical Tours", "Photography"],
            },
            {
                name: "Stonehenge",
                country: "UK",
                activities: ["Historical Exploration", "Photography"],
            },
            {
                name: "Petra",
                country: "Jordan",
                activities: ["Archaeological Tours", "Photography"],
            },
        ],
        forts: [
            {
                name: "Amber Fort",
                country: "India",
                activities: ["Fort Tours", "Light Show"],
            },
            {
                name: "Edinburgh Castle",
                country: "Scotland",
                activities: ["Historical Tours", "Museum Visit"],
            },
            {
                name: "Agra Fort",
                country: "India",
                activities: ["Historical Tours", "Photography"],
            },
            {
                name: "Neuschwanstein Castle",
                country: "Germany",
                activities: ["Castle Tours", "Photography"],
            },
            {
                name: "Kremlin",
                country: "Russia",
                activities: ["Historical Tours", "Museum Visits"],
            },
            {
                name: "Chateau de Chambord",
                country: "France",
                activities: ["Castle Tours", "Gardens"],
            },
            {
                name: "Alhambra",
                country: "Spain",
                activities: ["Architectural Tours", "Gardens"],
            },
        ],
        beach: [
            {
                name: "Maldives",
                country: "Maldives",
                activities: ["Snorkeling", "Sunbathing"],
            },
            {
                name: "Bondi Beach",
                country: "Australia",
                activities: ["Surfing", "Beach Volleyball"],
            },
            {
                name: "Copacabana",
                country: "Brazil",
                activities: ["Beach Sports", "Sunbathing"],
            },
            {
                name: "Maui",
                country: "Hawaii",
                activities: ["Surfing", "Snorkeling"],
            },
            {
                name: "Phuket",
                country: "Thailand",
                activities: ["Diving", "Beach Parties"],
            },
            {
                name: "Boracay",
                country: "Philippines",
                activities: ["Kite Surfing", "Beach Bars"],
            },
            {
                name: "Waikiki Beach",
                country: "Hawaii",
                activities: ["Surfing", "Shopping"],
            },
        ],
    };

    let itineraries = [];

    preferences.forEach((preference) => {
        if (places[preference]) {
            itineraries = itineraries.concat(places[preference]);
        }
    });

    return itineraries;
}

module.exports = {
    createItinerary,
    getItinerary,
    updateItinerary,
    deleteItinerary,
    getSuggestItineraries,
};
