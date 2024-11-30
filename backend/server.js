require("dotenv").config(); // Only need this once
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// MongoDB connection string from the .env file
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
const connectDB = async () => {
	try {
		// Connecting to MongoDB without deprecated options
		await mongoose.connect(MONGO_URI);
		console.log("MongoDB connected successfully!");
	} catch (err) {
		console.error("Error connecting to MongoDB:", err.message);
		process.exit(1); // Exit the process if MongoDB connection fails
	}
};

connectDB();

// Define a route for the root URL
app.get("/", (req, res) => {
	res.send("Backend is running!");
});

// Start your Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
