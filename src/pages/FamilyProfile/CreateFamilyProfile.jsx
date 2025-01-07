import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./SetUpFamilyProfile.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const SetUpFamilyProfile = () => {
	const [familyName, setFamilyName] = useState("");
	const [locationType, setLocationType] = useState("Use GPS");
	const [city, setCity] = useState("");
	const [province, setProvince] = useState("");
	const [country, setCountry] = useState("");
	const [timeFormat, setTimeFormat] = useState("24h");
	const [familyAvatar, setFamilyAvatar] = useState(null);
	const [familyMotto, setFamilyMotto] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		console.log("Form Data:", {
			familyName,
			locationType,
			city,
			province,
			country,
			timeFormat,
			familyAvatar,
			familyMotto,
		});

		const token = localStorage.getItem("token");
		if (!token) {
			setError("User not authenticated. Please log in again.");
			return;
		}

		const decoded = jwtDecode(token);
		const userId = decoded.userId;

		try {
			// Prepare FormData
			const formData = new FormData();
			formData.append("familyName", familyName);
			formData.append(
				"location",
				locationType === "Set Manually"
					? `${city}, ${province}, ${country}`
					: "GPS"
			);
			formData.append("timeFormat", timeFormat);
			formData.append("familyMotto", familyMotto);
			formData.append("userId", userId);

			if (familyAvatar) {
				formData.append("familyAvatar", familyAvatar); // Add file if selected
			}

			console.log(
				"Submitting FormData:",
				Object.fromEntries(formData.entries())
			);

			// Send data to backend
			const response = await axios.post(
				`${backendUrl}/api/familyProfile/create-family-profile`,
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			);

			console.log("Backend Response:", response.data);

			// Update localStorage and navigate
			const updatedUserData = {
				...JSON.parse(localStorage.getItem("user")),
				hasFamilyProfile: true,
			};
			localStorage.setItem("user", JSON.stringify(updatedUserData));

			setSuccess(response.data.message);

			// Navigate to the next step
			setTimeout(() => {
				navigate("/setup-user");
			}, 2000);
		} catch (error) {
			console.error(
				"Error creating family profile:",
				error.response?.data || error.message
			);
			setError("Failed to create family profile. Please try again.");
		}
	};

	return (
		<div className="profile-container">
			<h1>Create Family Profile</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Family Name:</label>
					<input
						type="text"
						value={familyName}
						onChange={(e) => setFamilyName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Location:</label>
					<select
						value={locationType}
						onChange={(e) => setLocationType(e.target.value)}
					>
						<option value="Use GPS">Use GPS</option>
						<option value="Set Manually">Set Manually</option>
					</select>
				</div>
				{locationType === "Set Manually" && (
					<>
						<div className="form-group">
							<label>City:</label>
							<input
								type="text"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<label>Province/State:</label>
							<input
								type="text"
								value={province}
								onChange={(e) => setProvince(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<label>Country:</label>
							<input
								type="text"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								required
							/>
						</div>
					</>
				)}
				<div className="form-group">
					<label>Time Format:</label>
					<select
						value={timeFormat}
						onChange={(e) => setTimeFormat(e.target.value)}
					>
						<option value="24h">24-Hour</option>
						<option value="AM/PM">AM/PM</option>
					</select>
				</div>
				<div className="form-group">
					<label>Family Motto:</label>
					<input
						type="text"
						value={familyMotto}
						onChange={(e) => setFamilyMotto(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Family Avatar (Optional):</label>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setFamilyAvatar(e.target.files[0])}
					/>
				</div>
				<button type="submit" className="submit-button">
					Create Family Profile
				</button>
			</form>
			{error && <p className="error">{error}</p>}
			{success && <p className="success">{success}</p>}
		</div>
	);
};

export default SetUpFamilyProfile;
