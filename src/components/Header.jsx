import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
	const navagate = useNavigate();
	const handleGoToDash = () => {
		navagate("/dashboard");
	};
	const [time, setTime] = useState();

	useEffect(() => {
		const interval = setInterval(() => {
			const localTime = new Date();

			let hours = localTime.getHours();
			const minutes = localTime.getMinutes();
			const ampm = hours >= 12 ? "PM" : "AM";

			hours = hours % 12;
			hours = hours ? hours : 12; // Handle the case when hours = 0 (midnight)

			const formattedTime = `${hours}:${
				minutes < 10 ? "0" + minutes : minutes
			} ${ampm}`;

			setTime(formattedTime);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="header">
			<button onClick={handleGoToDash} className="goToDash">
				<FontAwesomeIcon icon={faHouseChimney} />
			</button>
			<h1 className="headerTime">{time}</h1>
			<h3>w</h3>
		</div>
	);
};

export default Header;
