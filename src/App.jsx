import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing necessary components
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import Calendar from "./pages/Calendar/Calendar";
import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage />} />{" "}
				<Route path="/signup" element={<SignUpPage />} />{" "}
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<HomePage />{" "}
						</ProtectedRoute>
					}
				/>
				{""}
				<Route
					path="/calendar"
					element={
						<ProtectedRoute>
							<Calendar />
						</ProtectedRoute>
					}
				/>
				{""}
			</Routes>
		</Router>
	);
}

export default App;
