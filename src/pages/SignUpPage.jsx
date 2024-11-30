import React, { useState } from "react";

const SignUpPage = () => {
	const [username, setUsername] = useState(""); // Corrected to setUsername
	const [password, setPassword] = useState(""); // Corrected to setPassword
	const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmPassword state

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			console.log("Passwords do not match");
		} else {
			// Add logic to send the data to the server for registration
			console.log("Username:", username);
			console.log("Password:", password);
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
					onChange={(e) => setUsername(e.target.value)} // Corrected to setUsername
					className="submit-field"
					required
				/>
				<h2>Password</h2>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)} // Corrected to setPassword
					className="submit-field"
					required
				/>
				<h2>Confirm Password</h2>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)} // Added onChange for confirmPassword
					className="submit-field"
					required
				/>
				<br />
				<button className="submit-button">Submit</button>
			</form>
		</div>
	);
};

export default SignUpPage;
