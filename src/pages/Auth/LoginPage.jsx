import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Send login request
			const response = await axios.post(
				"http://localhost:5000/api/auth/login",
				{
					username,
					password,
				}
			);

			// Store user data and token in localStorage
			localStorage.setItem("user", JSON.stringify(response.data.user));
			localStorage.setItem("token", response.data.token);

			// Redirect based on `hasFamilyProfile` status
			if (!response.data.user.hasFamilyProfile) {
				navigate("/setup-family");
			} else {
				navigate("/dashboard");
			}
		} catch (error) {
			setMessage("Invalid credentials or error during login.");
			console.error("Error during login:", error);
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
					onChange={(e) => setUsername(e.target.value)}
					className="submit-field"
					placeholder="Enter your username"
					required
				/>

				<h2>Password</h2>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="submit-field"
					placeholder="Enter your password"
					required
				/>

				<br />
				<button type="submit" className="submit-button">
					Submit
				</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
};

export default LoginPage;
