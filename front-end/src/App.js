import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sign from "./Components/SignIn";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Reset from "./Components/Reset";
import News from "./HolderPages/NewsHolder";
import NewsHolder from "./HolderPages/NewsHolder";
import Events from "./Pages/Events";
import Weather from "./Pages/Weather";
import { React, Fragment } from "react";
import Home from "./Pages/Home";

export default function App() {
	return (
		<Router className="division">
			<Fragment>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign" element={<Sign />} />;
					<Route
						path="/dash"
						element={<Dashboard title="Dashboard" />}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/reset" element={<Reset />} />
					<Route
						path="/events"
						element={<Events title="Manage Events" />}
					/>
					<Route
						path="/news"
						element={<NewsHolder title="Manage News" />}
					/>
					<Route path="/weather" element={<Weather />} />;
				</Routes>
			</Fragment>
		</Router>
	);
}
