import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const SignUpPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission

		if (password !== confirmPassword) {
			console.log("Passwords do not match");
			return;
		}

		try {
			// Send POST request to the backend API to register the user
			const response = await axios.post("http://localhost:5000/api/register", {
				username: username,
				password: password,
			});

			console.log("User registered successfully:", response.data);
		} catch (error) {
			console.error("Error registering user:", error);
		}
	};

	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<h2>Username</h2>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<h2>Password</h2>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<h2>Confirm Password</h2>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default SignUpPage;
