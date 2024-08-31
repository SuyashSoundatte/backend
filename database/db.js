require('dotenv').config(); // Load environment variables from .env file

const mongoose = require("mongoose");
const mongoUrl = process.env.MONGODB_URI;

const connectDb = () => {
    return mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000
    })
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((error) => {
        console.error("Connection failed!", error);
    });
};

module.exports = connectDb;
