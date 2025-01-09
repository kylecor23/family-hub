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
		},
	],
	location: {
		type: String,
	},
	timeFormat: {
		type: String,
	},
	familyMotto: {
		type: String,
	},
});

module.exports = mongoose.model("FamilyProfile", familyProfileSchema);
