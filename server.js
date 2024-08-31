const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./database/db");
const authRoute = require("./routes/auth.routes");
const itineraryRoute = require("./routes/itinerary.routes");

// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);

app.use("/api/itinerary", itineraryRoute);

const port = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log("Server stared!");
});
