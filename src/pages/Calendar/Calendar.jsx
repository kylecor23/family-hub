import React, { useState, useEffect } from "react";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Calendar = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [daysInMonth, setDaysInMonth] = useState([]);

	// useEffect to calculate the days in the current month
	useEffect(() => {
		const firstDayOfMonth = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth(),
			1
		);
		const lastDayOfMonth = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() + 1,
			0
		);
		const totalDays = lastDayOfMonth.getDate();
		const firstDay = firstDayOfMonth.getDay(); // Get the starting day of the week (0 = Sunday)

		const days = [];

		// Add empty cells before the first day of the month (for correct alignment)
		for (let i = 0; i < firstDay; i++) {
			days.push(null); // Empty cell before the first day
		}

		// Add the days of the month
		for (let i = 1; i <= totalDays; i++) {
			days.push(i);
		}

		setDaysInMonth(days);
	}, [currentMonth]);

	// Function to go to the previous month
	const goToPreviousMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
		);
	};

	// Function to go to the next month
	const goToNextMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
		);
	};

	// Get the name of the current month (e.g., "January", "February")
	const monthName = currentMonth.toLocaleString("default", { month: "long" });

	return (
		<div>
			<h1>Calendar</h1>
			{/* Navigation buttons */}
			<div className="navigation-buttons">
				<button onClick={goToPreviousMonth}>
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>
				<h2>
					{monthName} {currentMonth.getFullYear()}
				</h2>
				<button onClick={goToNextMonth}>
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			</div>

			{/* Calendar Grid */}
			<div className="calendar-grid">
				{/* Weekday headers */}
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
					<div key={index} className="calendar-day header">
						{day}
					</div>
				))}

				{/* Days in the month */}
				{daysInMonth.map((day, index) => (
					<div
						key={index}
						className={`calendar-day ${
							day === new Date().getDate() ? "today" : ""
						}`}
					>
						{day || ""}
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;
