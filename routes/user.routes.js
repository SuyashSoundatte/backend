const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.Controller");

// router.post("/", userController.createUserProfile);

router.get("/:userId", userController.getUserProfile);

router.put("/:userId", userController.updateUserProfile);

router.delete("/:userId", userController.deleteUserProfile);
// router.put('/:userId/profile-pic', upload.single('profilePic'), userController.updateProfilePic);

module.exports = router;
