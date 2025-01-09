import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const InitialUserProfile = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [notificationPreferences, setNotificationPreferences] =
		useState("email");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const [searchParams] = useSearchParams();
	const familyProfileId = searchParams.get("familyProfileId"); // Extract familyProfileId
	const navigate = useNavigate();

	// Redirect if familyProfileId is missing
	useEffect(() => {
		if (!familyProfileId) {
			console.error("Error: familyProfileId is missing");
			alert("familyProfileId is required to set up the user profile.");
			navigate("/setup-family");
		}
	}, [familyProfileId, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		try {
			const response = await axios.post(
				`${backendUrl}/api/userProfile/create`,
				{
					email,
					password,
					displayName,
					familyProfileId, // Use the extracted familyProfileId
					notificationPreferences,
					role: "Admin", // Explicitly set the role as Admin
				}
			);

			setSuccess(response.data.message);

			setTimeout(() => {
				navigate("/dashboard");
			}, 2000);
		} catch (error) {
			console.error(
				"Error creating user profile:",
				error.response?.data || error.message
			);
			setError("Failed to create user profile. Please try again.");
		}
	};

	return (
		<div className="profile-container">
			<h1>Set Up Your Personal Profile</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Display Name:</label>
					<input
						type="text"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Notification Preferences:</label>
					<select
						value={notificationPreferences}
						onChange={(e) => setNotificationPreferences(e.target.value)}
					>
						<option value="email">Email</option>
						<option value="app">App Notifications</option>
						<option value="none">None</option>
					</select>
				</div>
				<button type="submit">Create Profile</button>
				{error && <p style={{ color: "red" }}>{error}</p>}
				{success && <p style={{ color: "green" }}>{success}</p>}
			</form>
		</div>
	);
};

export default InitialUserProfile;
