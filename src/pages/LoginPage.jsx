import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation to the SignUpPage

const LoginPage = () => {
	const [username, setUsername] = useState(""); // Corrected to setUsername
	const [password, setPassword] = useState(""); // Corrected to setPassword

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you can add logic to send the data to the server
		console.log("Username:", username);
		console.log("Password:", password);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>Log In</h1>

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
				<br />
				<button className="submit-button">Submit</button>
			</form>

			{/* Link to the Sign-Up page */}
			<Link to="/signup">
				<button className="sign-up-button">Sign Up</button>
			</Link>
		</div>
	);
};

export default LoginPage;
