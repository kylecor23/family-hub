import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Use `useNavigate` for programmatic navigation

const SignUpPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(""); // For displaying messages

	const navigate = useNavigate(); // Get the navigate function to redirect

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
			return;
		}

		try {
			// Send POST request to the backend API to register the user
			const response = await axios.post("http://localhost:5000/api/register", {
				username: username,
				password: password,
			});
			setMessage("User registered successfully!"); // Show success message

			// Delay the redirection to allow user to see the success message
			setTimeout(() => {
				navigate("/login"); // Redirect to login page after 2 seconds
			}, 2000); // 2-second delay before redirecting
		} catch (error) {
			setMessage(
				"Error registering user: " + error.response?.data?.message ||
					error.message
			);
		}
	};

	const handleGoToLogin = () => {
		navigate("/login"); // Navigate to login page when button is clicked
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
			{/* Button to navigate to the Login page */}
			<button onClick={handleGoToLogin}>Log In</button>
			{message && <p>{message}</p>} {/* Display success or error message */}
		</div>
	);
};

export default SignUpPage;
