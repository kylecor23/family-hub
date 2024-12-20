const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/geocode", async (req, res) => {
	const { location } = req.query;

	if (!location) {
		return res.status(400).json({ error: "Location is required" });
	}

	try {
		// Use the existing VITE_WEATHER_API_KEY
		console.log("Weather API Key:", process.env.VITE_WEATHER_API_KEY);

		const geoResponse = await axios.get(
			`https://api.openweathermap.org/geo/1.0/direct`,
			{
				params: {
					q: location,
					limit: 1,
					appid: process.env.VITE_WEATHER_API_KEY, // Updated key reference
				},
			}
		);

		if (!geoResponse.data || geoResponse.data.length === 0) {
			return res.status(404).json({ error: "Location not found" });
		}

		const locationData = geoResponse.data[0];
		res.json({
			city: locationData.name,
			country: locationData.country,
			lat: locationData.lat,
			lon: locationData.lon,
		});
	} catch (error) {
		console.error("Geocoding API Error:", error.message);
		res.status(500).json({ error: "Failed to fetch location data" });
	}
});

module.exports = router;
