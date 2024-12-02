import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import axios from "axios";

const LoginPage = () => {
	const [username, setUsername] = useState(""); // Corrected to setUsername
	const [password, setPassword] = useState(""); // Corrected to setPassword
	const [message, setMessage] = useState(""); // For displaying messages
	const navigate = useNavigate(); // Initialize navigate for redirection

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission
		console.log("Form submitted");

		// Log the username and password (be cautious with logging passwords in production)
		console.log("Username:", username);
		console.log("Password:", password);

		try {
			// Send login request
			console.log("Sending request to /api/login with username and password");
			const response = await axios.post("http://localhost:5000/api/login", {
				username,
				password,
			});

			// Log response data to ensure we get the token
			console.log("Login successful, response:", response);

			// Store the JWT token in localStorage
			localStorage.setItem("token", response.data.token);

			// Set success message and navigate to the dashboard
			setMessage("User logged in successfully!");
			navigate("/dashboard"); // Redirect to dashboard after successful login
		} catch (error) {
			// Log error to inspect
			console.error("Error during login:", error);

			// Show message to user
			setMessage("Invalid credentials or error during login.");
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>Log In</h1>

				<h2>Username</h2>
				<input
					type="text"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
						console.log("Username updated:", e.target.value); // Log username input
					}}
					className="submit-field"
					placeholder="Enter your username"
					required
				/>

				<h2>Password</h2>
				<input
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						console.log("Password updated:", e.target.value); // Log password input
					}}
					className="submit-field"
					placeholder="Enter your password"
					required
				/>

				<br />
				<button type="submit" className="submit-button">
					Submit
				</button>
			</form>
			{message && <p>{message}</p>} {/* Display success or error message */}
			{/* Link to the Sign-Up page */}
			<Link to="/signup">
				<button className="sign-up-button">Sign Up</button>
			</Link>
		</div>
	);
};

export default LoginPage;
