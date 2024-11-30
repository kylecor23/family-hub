import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing necessary components
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				{/* Defining routes */}
				<Route path="/" element={<LoginPage />} />{" "}
				{/* Default route for login */}
				<Route path="/signup" element={<SignUpPage />} />{" "}
				{/* Route for sign-up */}
			</Routes>
		</Router>
	);
}

export default App;
