const express = require("express");
const router = express.Router();
const { getHotelsByCity } = require("../controllers/hotels.controller");
router.get("/:city", getHotelsByCity);
module.exports = router;
