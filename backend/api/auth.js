const jwt = require("jsonwebtoken"); // Add this line

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

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		// Find user by username
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		// Debugging: Log the entered password and the stored hashed password
		console.log("Entered password:", password);
		console.log("Stored hashed password:", user.password);
		// Compare the provided password with the stored hashed password
		const isMatch = await bcrypt.compare(password, user.password);
		// Debugging: Log the result of the password comparison
		console.log("Password match status:", isMatch);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Generate JWT token if credentials match
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		// Send the token in the response
		res.json({ message: "Login successful", token });
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
