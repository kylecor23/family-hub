const express = require("express");
const FamilyProfile = require("../models/FamilyProfile");

const router = express.Router();

// Create a new family profile
router.post("/create-family-profile", async (req, res) => {
	try {
		console.log("Request Body:", req.body);

		const { familyName, userId, location, timeFormat, familyMotto } = req.body;

		// Validate required fields
		if (!familyName || !userId) {
			console.error("Validation Error: Missing familyName or userId");
			return res.status(400).json({ error: "Missing required fields" });
		}

		const profileData = {
			familyName,
			members: [{ userId }], // Add userId as the first member
			location,
			timeFormat,
			familyMotto,
		};

		const newFamilyProfile = new FamilyProfile(profileData);
		await newFamilyProfile.save();

		res.status(201).json({
			message: "Family profile created successfully",
			familyProfileId: newFamilyProfile._id,
		});
	} catch (error) {
		console.error("Error creating family profile:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
