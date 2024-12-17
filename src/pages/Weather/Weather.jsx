import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSun,
	faCloud,
	faCloudRain,
	faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import "./Weather.css";

const Weather = () => {
	const [city, setCity] = useState(""); // User input for city
	const [weatherData, setWeatherData] = useState(null);
	const [forecastData, setForecastData] = useState(null); // For the 5-day forecast
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [useDefaultLocation, setUseDefaultLocation] = useState(true); // To switch between default and manual city
	const [selectedDay, setSelectedDay] = useState(null); // To toggle between the 5-day forecast and detailed day view

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
			setWeatherData(response.data);

			// Fetch the 5-day forecast
			const forecastResponse = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?appid=${
					import.meta.env.VITE_WEATHER_API_KEY
				}&units=metric&lat=${response.data.coord.lat}&lon=${
					response.data.coord.lon
				}`
			);
			setForecastData(forecastResponse.data);
			setError(null);
		} catch (error) {
			setError("Failed to fetch weather data. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Handle form submit to change city
	const handleSubmit = (e) => {
		e.preventDefault();
		setUseDefaultLocation(false);
		fetchWeatherData(); // Call the function to fetch weather data based on city
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

	// Calculate daily high/low temperatures and convert to whole numbers
	const getDailyForecast = () => {
		if (!forecastData) return [];

		const dailyData = [];
		const daily = forecastData.list;

		for (let i = 8; i < daily.length; i += 8) {
			// Skip the first index to avoid today
			const dayData = daily.slice(i, i + 8);
			const temps = dayData.map((hour) => hour.main.temp);
			const highTemp = Math.round(Math.max(...temps));
			const lowTemp = Math.round(Math.min(...temps));
			const weatherCondition = dayData[0].weather[0].main;

			const date = new Date(dayData[0].dt * 1000);
			const dayName = date.toLocaleString("en-US", { weekday: "long" });

			dailyData.push({
				dayName,
				highTemp,
				lowTemp,
				weatherCondition,
				date: date.toLocaleDateString(),
				hourlyData: dayData, // Store hourly data for detailed view
			});
		}
		return dailyData;
	};

	// Handle click on a specific day
	const handleDayClick = (day) => {
		setSelectedDay(day); // Set the selected day for detailed view
	};

	// Handle going back to the 5-day forecast
	const handleBackToForecast = () => {
		setSelectedDay(null); // Reset selected day to show the 5-day forecast again
	};

	// Format Hourly Data (Rounds temperature to nearest whole number and formats time)
	const getHourlyForecast = (hourlyData) => {
		return hourlyData.map((hour) => {
			return {
				time: new Date(hour.dt * 1000).toLocaleTimeString([], {
					hour: "2-digit", // Two digits for the hour (24-hour format)
					minute: "2-digit", // Two digits for minutes
					hour12: false, // Ensure it is in 24-hour format
				}),
				temp: Math.round(hour.main.temp), // Round temperature to a whole number
			};
		});
	};

	return (
		<div className="weather-container">
			{loading && <p>Loading weather data...</p>}
			{error && <p>{error}</p>}

			{/* Main Display */}
			{weatherData && !selectedDay && (
				<>
					{/* City and Today's Weather */}
					<div className="main-weather">
						<h2>{weatherData.name}</h2>
						<FontAwesomeIcon
							icon={getWeatherIcon(weatherData.weather[0].main)}
							size="3x"
						/>
						<p>{weatherData.weather[0].description}</p>
						<p>Temperature: {Math.round(weatherData.main.temp)}°C</p>
						<p>
							High: {Math.round(weatherData.main.temp_max)}°C / Low:{" "}
							{Math.round(weatherData.main.temp_min)}°C
						</p>
					</div>

					{/* 5-Day Forecast (without today's weather) */}
					<div className="forecast">
						{getDailyForecast().map((day, index) => (
							<div
								key={index}
								className="daily-item"
								onClick={() => handleDayClick(day)}
							>
								<h3>{day.dayName}</h3>
								<FontAwesomeIcon
									icon={getWeatherIcon(day.weatherCondition)}
									size="2x"
								/>
								<p>High: {day.highTemp}°C</p>
								<p>Low: {day.lowTemp}°C</p>
							</div>
						))}
					</div>
				</>
			)}

			{/* Detailed View for a Selected Day */}
			{selectedDay && (
				<div className="daily-detail">
					<button onClick={handleBackToForecast}>Back to 5-Day Forecast</button>
					<h3>{selectedDay.dayName}</h3>
					<p>{selectedDay.date}</p>

					{/* Hourly Breakdown */}
					<div className="hourly-breakdown">
						{getHourlyForecast(selectedDay.hourlyData).map((hour, index) => (
							<div key={index} className="hourly-item">
								<p>{hour.time}</p>
								<FontAwesomeIcon
									icon={getWeatherIcon(
										selectedDay.hourlyData[index].weather[0].main
									)}
									size="2x"
								/>
								<p>{hour.temp}°C</p>
							</div>
						))}
					</div>

					{/* More Info */}
					<div className="more-info">
						<p>Wind Speed: {selectedDay.hourlyData[0].wind.speed} m/s</p>
						<p>Humidity: {selectedDay.hourlyData[0].main.humidity}%</p>
						<p>Pressure: {selectedDay.hourlyData[0].main.pressure} hPa</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Weather;
