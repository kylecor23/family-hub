const express = require("express");
const multer = require("multer");
const FamilyProfile = require("../models/FamilyProfile");
const router = express.Router();

const upload = multer({
	dest: "uploads/",
	limits: { fileSize: 5 * 1024 * 1024 },
});

// Create a new family profile
router.post(
	"/create-family-profile",
	upload.single("familyAvatar"),
	async (req, res) => {
		try {
			console.log("Request Body:", req.body); // Debug incoming fields
			console.log("Uploaded File:", req.file); // Debug uploaded file (if any)

			const { familyName, userId, location, timeFormat, familyMotto } =
				req.body;

			// Validate required fields
			if (!familyName || !userId) {
				console.error("Validation Error: Missing familyName or userId");
				return res.status(400).json({ error: "Missing required fields" });
			}

			const profileData = {
				familyName,
				location,
				timeFormat,
				familyMotto,
			};

			if (req.file) {
				profileData.familyAvatar = req.file.path;
			}

			console.log("Profile Data to Save:", profileData);

			const newFamilyProfile = new FamilyProfile(profileData);
			await newFamilyProfile.save();

			res.status(201).json({ message: "Family profile created successfully" });
		} catch (error) {
			console.error("Error creating family profile:", error.message);
			console.error(error.stack);
			res
				.status(500)
				.json({ error: "Internal server error", details: error.message });
		}
	}
);

module.exports = router;
