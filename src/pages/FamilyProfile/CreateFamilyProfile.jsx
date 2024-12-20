import React, { useState } from "react";
import axios from "axios";

const SetUpFamilyProfile = () => {
	const [familyName, setFamilyName] = useState("");
	const [role, setRole] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userId = "currentLoggedInUserId"; // You will get this ID from your app's state

		try {
			const response = await axios.post(
				"http://localhost:5000/api/familyProfile/create-family-profile",
				{
					familyName,
					role,
					userId,
				}
			);
			setSuccess(response.data.message);
		} catch (error) {
			setError("Error creating family profile. Please try again.");
			console.error(error);
		}
	};

	return (
		<div>
			<h1>Create Family Profile</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Family Name:</label>
					<input
						type="text"
						value={familyName}
						onChange={(e) => setFamilyName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Role:</label>
					<input
						type="text"
						value={role}
						onChange={(e) => setRole(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Create Family Profile</button>
			</form>
			{error && <p>{error}</p>}
			{success && <p>{success}</p>}
		</div>
	);
};

export default SetUpFamilyProfile;
