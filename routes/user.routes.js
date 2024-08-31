const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.Controller");
const multer = require("multer");
const path = require("path");

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: fileFilter
});

// Routes
router.get("/:userId", userController.getUserProfile);
router.put("/:userId", userController.updateUserProfile);
router.delete("/:userId", userController.deleteUserProfile);

// New route to update profile picture
router.put('/:userId/profile-pic', upload.single('profilePic'), userController.updateProfilePic);


module.exports = router;
