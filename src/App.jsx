import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom"; // Importing necessary components
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import Calendar from "./pages/Calendar/Calendar";
import Weather from "./pages/Weather/Weather";
import Header from "./components/header";
import "./App.css";

function App() {
	const AppHeader = () => {
		const location = useLocation();

		// Hide header on these pages
		if (
			location.pathname === "/login" ||
			location.pathname === "/signup" ||
			location.pathname === "/dashboard"
		) {
			return null;
		}

		return <Header />;
	};

	return (
		<Router>
			<AppHeader />
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
				<Route
					path="/weather"
					element={
						<ProtectedRoute>
							<Weather />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
