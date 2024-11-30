const express = require("express");
const bcrypt = require("bcryptjs"); // For hashing passwords
const User = require("../models/User"); // Assuming you have a User model in models/User.js
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	try {
		// Check if user already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({
			username,
			password: hashedPassword,
		});

		// Save the user to the database
		await newUser.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
