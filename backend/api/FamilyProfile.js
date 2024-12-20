const express = require("express");
const FamilyProfile = require("../models/FamilyProfile");
const User = require("../models/User");
const router = express.Router();

// Create a new family profile
router.post("/create-family-profile", async (req, res) => {
	const { familyName, role, userId } = req.body; // Get user info from the body

	try {
		// Create a new family profile
		const newFamilyProfile = new FamilyProfile({
			familyName,
			members: [{ userId, role }],
		});

		// Save the family profile
		await newFamilyProfile.save();

		// Update the user's profile to link to the family profile
		const user = await User.findById(userId);
		user.hasFamilyProfile = true; // Mark the user as having a family profile
		user.familyProfileId = newFamilyProfile._id; // Link the user to the new family profile
		await user.save();

		res.status(201).json({ message: "Family profile created successfully" });
	} catch (error) {
		console.error("Error creating family profile:", error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
