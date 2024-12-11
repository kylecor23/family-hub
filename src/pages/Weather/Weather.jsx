import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSun,
	faCloud,
	faCloudRain,
	faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import "./Weather.css"; // Ensure you have styling for the weather component

const Weather = () => {
	const [city, setCity] = useState(""); // User input for city
	const [weatherData, setWeatherData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [useDefaultLocation, setUseDefaultLocation] = useState(true); // To switch between default and manual city

	// Function to get the correct weather icon based on condition
	const getWeatherIcon = (condition) => {
		switch (condition) {
			case "Clear":
				return faSun;
			case "Clouds":
				return faCloud;
			case "Rain":
				return faCloudRain;
			case "Snow":
				return faSnowflake;
			default:
				return faCloud; // Default icon for other conditions
		}
	};

	// Fetch weather data based on user input or location (latitude, longitude)
	const fetchWeatherData = async (lat = null, lon = null) => {
		setLoading(true); // Set loading state
		try {
			let url = `https://api.openweathermap.org/data/2.5/weather?appid=${
				import.meta.env.VITE_WEATHER_API_KEY
			}&units=metric`;

			if (lat && lon) {
				url += `&lat=${lat}&lon=${lon}`;
			} else if (city) {
				url += `&q=${city}`;
			}

			const response = await axios.get(url);
			setWeatherData(response.data); // Set the weather data state
			setError(null); // Clear any previous error
			setLoading(false); // Reset loading state
		} catch (error) {
			setError("Failed to fetch weather data. Please try again.");
			setLoading(false); // Reset loading state
			console.error(error);
		}
	};

	// Handle form submit to change city
	const handleSubmit = (e) => {
		e.preventDefault();
		setUseDefaultLocation(false); // Switch to user input location
		fetchWeatherData(); // Call the function to fetch weather data based on city
	};

	// Fetch weather data based on geolocation by default
	useEffect(() => {
		if (useDefaultLocation) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;
						fetchWeatherData(latitude, longitude); // Fetch weather data using geolocation
					},
					(err) => {
						setError("Could not get geolocation");
						console.error(err);
					}
				);
			} else {
				setError("Geolocation is not supported by this browser.");
			}
		}
	}, [useDefaultLocation]);

	return (
		<div className="weather-container">
			{loading && <p>Loading weather data...</p>}

			{error && <p>{error}</p>}

			{weatherData && (
				<div className="weather-info">
					<h2>{weatherData.name}</h2>
					<FontAwesomeIcon
						icon={getWeatherIcon(weatherData.weather[0].main)}
						size="3x" // Adjust size as needed
					/>
					<p>{weatherData.weather[0].description}</p>
					<p>Temperature: {weatherData.main.temp}°C</p>
					<p>Humidity: {weatherData.main.humidity}%</p>
					<p>Wind Speed: {weatherData.wind.speed} m/s</p>
				</div>
			)}
		</div>
	);
};

export default Weather;
