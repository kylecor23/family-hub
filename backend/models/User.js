const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	hasFamilyProfile: {
		type: Boolean,
		default: false, // Initially, users don't have a family profile
	},
	familyProfileId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FamilyProfile", // Reference to the family profile
	},
});

module.exports = mongoose.model("User", userSchema);
