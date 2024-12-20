const mongoose = require("mongoose");

const familyProfileSchema = new mongoose.Schema({
	familyName: {
		type: String,
		required: true,
	},
	members: [
		{
			userId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User", // Reference to the User model
			},
			role: {
				type: String, // "Dad", "Mom", "Child", etc.
				required: true,
			},
		},
	],
	// Add any other fields you'd like to store for the family
});

module.exports = mongoose.model("FamilyProfile", familyProfileSchema);
