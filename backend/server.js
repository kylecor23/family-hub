require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

// Import routes
const authRoutes = require("./api/auth"); // Authentication routes
const familyProfileRoutes = require("./api/FamilyProfile.js"); // Family Profile routes
const geocodeRoutes = require("./api/geocode");

// MongoDB connection string from the .env file
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] })); // Allow multiple origins

app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected successfully!");
	} catch (err) {
		console.error("Error connecting to MongoDB:", err.message);
		process.exit(1); // Exit the process if MongoDB connection fails
	}
};

connectDB();

// Routes
app.use("/api", authRoutes); // Authentication routes (e.g., /api/register)
app.use("/api/familyProfile", familyProfileRoutes); // Family Profile routes
app.use("/api", geocodeRoutes); // Geocoding routes

// Root URL
app.get("/", (req, res) => {
	res.send("Backend is running!");
});

// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
