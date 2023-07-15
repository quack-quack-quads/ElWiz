import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Lander from "./screens/Lander/Lander";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// import Carousel from "./components/Carousel/Carousel";

import Dash from "./screens/Dash/Dash";
import StudentCreate from "./screens/Create/StudentCreate";
import ElectiveCreate from "./screens/Create/ElectiveCreate";
import StudentRetrieve from "./screens/Retrieve/StudentRetrieve";
import ElectiveRetrieve from "./screens/Retrieve/ElectiveRetrieve";
import StudentDetails from "./screens/Details/StudentDetails";
import ElectiveDetails from "./screens/Details/ElectiveDetails";

import { fetchStudentListAPICall, fetchElectiveListAPICall } from "./services";
import { setElectives, setStudents } from "./store";
import { VITE_ENV_TRIAL } from "./config";


function App() {
	console.log("Showing env variable", VITE_ENV_TRIAL);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const students = useSelector((state) => state.students);
	const electives = useSelector((state) => state.electives);

	const fetchStudentList = async () => {
		try {
			const response = await fetchStudentListAPICall();
			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	const fetchElectiveList = async () => {
		try {
			const response = await fetchElectiveListAPICall();
			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user.email === null) {
			return;
		}
		if (students.length === 0) {
			fetchStudentList().then((data) => {
				// ! sort according to email
				data.sort((a, b) => {
					if (a.email < b.email) {
						return -1;
					}
					if (a.email > b.email) {
						return 1;
					}
					return 0;
				});
				dispatch(setStudents(data));
			});
		}
		if (electives.length === 0) {
			fetchElectiveList().then((data) => {
				// ! sort according to code
				data.sort((a, b) => {
					if (a.code < b.code) {
						return -1;
					}
					if (a.code > b.code) {
						return 1;
					}
					return 0;
				});
				dispatch(setElectives(data));
			});
		}
	}, []);
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dash" element={<Dash />} />
					<Route path="/student/create" element={<StudentCreate />} />
					<Route
						path="/elective/create"
						element={<ElectiveCreate />}
					/>
					<Route
						path="/student/retrieve"
						element={<StudentRetrieve students={students} />}
					/>
					<Route
						path="/elective/retrieve"
						element={<ElectiveRetrieve electives={electives} />}
					/>
					<Route
						path="/student/details/:email"
						element={<StudentDetails electives={electives} />}
					/>
					<Route
						path="/elective/details/:code"
						element={<ElectiveDetails students={students} />}
					/>
					<Route path="/" element={<Lander />} />

					{/* <Route path="/cdev" element={<Carousel />} /> */}
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
