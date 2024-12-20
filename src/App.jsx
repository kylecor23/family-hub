import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import Calendar from "./pages/Calendar/Calendar";
import Weather from "./pages/Weather/Weather";
import Header from "./components/Header";
import SetUpFamilyProfile from "./pages/FamilyProfile/CreateFamilyProfile";
import "./App.css";

function App() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	// Check authentication and setup status
	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("user"));
		if (userData) {
			setUser(userData);
			if (!userData.hasFamilyProfile && location.pathname !== "/setup-family") {
				navigate("/setup-family");
			} else if (
				userData.hasFamilyProfile &&
				location.pathname === "/setup-family"
			) {
				navigate("/dashboard");
			}
		} else if (location.pathname !== "/login") {
			navigate("/login");
		}
	}, [location.pathname, navigate]);

	// Hide header on certain pages
	const AppHeader = () => {
		if (
			location.pathname === "/login" ||
			location.pathname === "/signup" ||
			location.pathname === "/setup-family"
		) {
			return null;
		}
		return <Header />;
	};

	return (
		<>
			<AppHeader />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/calendar"
					element={
						<ProtectedRoute>
							<Calendar />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/weather"
					element={
						<ProtectedRoute>
							<Weather />
						</ProtectedRoute>
					}
				/>
				<Route path="/setup-family" element={<SetUpFamilyProfile />} />
			</Routes>
		</>
	);
}

export default App;
