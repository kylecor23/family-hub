const express = require("express");
const FamilyProfile = require("../models/FamilyProfile");
const router = express.Router();

// Create a new family profile
router.post("/create-family-profile", async (req, res) => {
	console.log("Incoming Body:", req.body); // Debug log
	const { familyName, userId } = req.body;

	if (!familyName || !userId) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	try {
		const newFamilyProfile = new FamilyProfile({
			familyName,
			members: [{ userId }], // Add the creator as a member
		});

		await newFamilyProfile.save();
		res.status(201).json({ message: "Family profile created successfully" });
	} catch (error) {
		console.error("Error creating family profile:", error);
		res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
