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
	const [weatherData, setWeatherData] = useState(null);
	const [error, setError] = useState(null);

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

	const fetchWeatherData = async (lat, lon) => {
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lat=${lat}&lon=${lon}`
			);
			setWeatherData({
				temp: Math.round(response.data.main.temp),
				icon: response.data.weather[0].main,
			});
			setError(null);
		} catch (error) {
			setError("Failed to fetch weather data.");
		}
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					fetchWeatherData(latitude, longitude);
				},
				(err) => {
					setError("Could not get geolocation.");
				}
			);
		} else {
			setError("Geolocation is not supported by this browser.");
		}
	}, []);

	return (
		<div className="current-weather">
			{error && <p>{error}</p>}
			{weatherData ? (
				<div>
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
