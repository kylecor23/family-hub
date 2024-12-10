import React from "react";
import "./HomePage.css"; // Make sure to import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
	faPaintRoller,
	faSun,
	faUtensils,
	faClipboardList,
	faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();
	const handleGoToCalendar = () => navigate("/calendar");

	return (
		<div className="grid-container">
			<div className="calendar">
				<button className="HomeButton" onClick={handleGoToCalendar}>
					<FontAwesomeIcon icon={faCalendarDays} />
					<span>Calender</span>
				</button>
			</div>
			<div className="weather">
				<button className="HomeButton">
					<FontAwesomeIcon icon={faSun} />
					Weather
				</button>
			</div>
			<div className="lists">
				<button className="HomeButton">Lists</button>
			</div>
			<div className="chores">
				<button className="HomeButton">
					<FontAwesomeIcon icon={faClipboardList} />
					Chores
				</button>
			</div>
			<div className="maintenance">
				<button className="HomeButton">
					<FontAwesomeIcon icon={faPaintRoller} />
					<span>House Maintenance</span>
				</button>
			</div>
			<div className="food">
				<button className="HomeButton">
					<FontAwesomeIcon icon={faUtensils} />
					<span>Food</span>
				</button>
			</div>
			<div className="settings">
				<button className="HomeButton">
					<FontAwesomeIcon icon={faGear} />
					<span>Settings</span>
				</button>
			</div>
		</div>
	);
};

export default HomePage;
