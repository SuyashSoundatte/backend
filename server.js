const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./database/db")();
const authRoute = require("./routes/auth.routes");
const itineraryRoute = require("./routes/itinerary.routes");
const userRoutes = require("../backend/routes/user.routes");
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/auth", authRoute);

app.use("/api/itinerary", itineraryRoute);
app.use("/users", userRoutes);
app.use("/uploads", express.static("uploads"));
const port = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("Hello ");
});

app.listen(port, () => {
  console.log("Server stared on port: " + port + "!");
});
