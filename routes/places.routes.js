const express = require("express");
const router = express.Router();
const { getNearbyPlaces } = require("../controllers/places.controller");
const { isLoggedIn } = require("../middlewares/auth.middlewares");
router.get("/:city", getNearbyPlaces);

module.exports = router;
