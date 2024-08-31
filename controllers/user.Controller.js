const User = require('../models/user.model');

// Create user profile
exports.createUserProfile = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, preferences } = req.body;
        const user = new User({ name, email, password, phoneNumber, preferences });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            preferences: user.preferences
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, password, phoneNumber, preferences } = req.body;
        const user = await User.findByIdAndUpdate(userId, { name, email, password, phoneNumber, preferences }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};