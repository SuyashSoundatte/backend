const express = require("express");
const router = express.Router();
const { getWeatherInCity } = require("../controllers/weather.controller");
router.get("/:city", getWeatherInCity);
module.exports = router;
