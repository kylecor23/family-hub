const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const FamilyProfile = require("../models/FamilyProfile");
const router = express.Router();

router.post("/create", async (req, res) => {
	console.log("Incoming Request Body:", req.body); // Debug log for incoming request

	const {
		email,
		password,
		displayName,
		familyProfileId,
		role,
		notificationPreferences,
	} = req.body;

	if (!email || !password || !displayName || !familyProfileId) {
		console.error("Missing Required Fields:", {
			email,
			password,
			displayName,
			familyProfileId,
		});
		return res.status(400).json({ error: "Missing required fields" });
	}

	try {
		// Check if the family profile exists
		const familyProfile = await FamilyProfile.findById(familyProfileId);
		if (!familyProfile) {
			console.error("Family Profile Not Found:", familyProfileId);
			return res.status(404).json({ error: "Family profile not found" });
		}

		// Hash the user's password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new user
		const newUser = new User({
			email,
			password: hashedPassword,
			displayName,
			familyProfileId,
			role: role || "Admin", // Default to Admin if not specified
			notificationPreferences: notificationPreferences || "email",
		});

		await newUser.save();

		res
			.status(201)
			.json({ message: "Admin user profile created successfully" });
	} catch (error) {
		console.error("Error creating user profile:", error.message);
		res
			.status(500)
			.json({ error: "Internal server error", details: error.message });
	}
});

module.exports = router;
