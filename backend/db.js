const mongoose = require("mongoose");

// MongoDB connection string (replace with your own Mongo URI if using MongoDB Atlas)
const dbURI = "mongodb://localhost:27017/familyhub"; // Replace with MongoDB Atlas URI if using the cloud

const connectDB = async () => {
	try {
		await mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected successfully!");
	} catch (err) {
		console.error("Error connecting to MongoDB:", err.message);
		process.exit(1); // Exit process with failure
	}
};

module.exports = connectDB;
