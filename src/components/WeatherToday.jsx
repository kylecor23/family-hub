// CurrentWeather.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSun,
	faCloud,
	faCloudRain,
	faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

const CurrentWeather = () => {
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
				return faCloud;
		}
	};

	// Fetch weather data based on user input or geolocation (latitude, longitude)
	const fetchWeatherData = async (lat = null, lon = null) => {
		setLoading(true); // Set loading state
		try {
			let url = `https://api.openweathermap.org/data/2.5/weather?appid=${
				import.meta.env.VITE_WEATHER_API_KEY
			}&units=metric`;

			if (lat && lon) {
				url += `&lat=${lat}&lon=${lon}`;
			} else if (city) {
				const geoResponse = await axios.get(
					`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${
						import.meta.env.VITE_WEATHER_API_KEY
					}`
				);
				const { lat: cityLat, lon: cityLon } = geoResponse.data[0];
				url += `&lat=${cityLat}&lon=${cityLon}`;
			} else {
				throw new Error("City or coordinates must be provided.");
			}

			// Fetch current weather data
			const response = await axios.get(url);

			// Correct the structure of weatherData
			setWeatherData({
				temp: Math.round(response.data.main.temp), // temperature in °C, rounded to nearest integer
				icon: response.data.weather[0].main, // weather icon condition (Clear, Rain, etc.)
			});
			setError(null); // Clear any previous error
		} catch (error) {
			setError("Failed to fetch weather data. Please try again.");
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	// Fetch weather data based on geolocation by default
	useEffect(() => {
		if (useDefaultLocation) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;
						fetchWeatherData(latitude, longitude);
					},
					(err) => {
						setError("Could not get geolocation");
					}
				);
			} else {
				setError("Geolocation is not supported by this browser.");
			}
		}
	}, [useDefaultLocation]);

	return (
		<div className="current-weather">
			{error && <p>{error}</p>}
			{weatherData ? (
				<div className="current-weather">
					<p>{weatherData.temp}°C</p>
					<FontAwesomeIcon icon={getWeatherIcon(weatherData.icon)} size="2x" />
				</div>
			) : (
				<p>Loading weather...</p>
			)}
		</div>
	);
};

export default CurrentWeather;
