import "../Login/Login.scss";
import Wizard from "../../assets/wizard.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "../../hooks";
import { signupUserAPICall } from "../../services"
import { login } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const roles = ["OFFICE_ADMIN", "STUDENT_ADMIN", "TEACHER_ADMIN"];

	const initialValue = {
		email: "",
		password: "",
		conf: "",
		name: "",
		role: roles[0],
	};

	const [waiting, setWaiting] = useState(false);

	const handleSignupResponse = (response) => {
		if (response.status == 200) {
			navigate("/login");
		} else {
			throw new Error("Auth failed");
		}
	}

	const signUpUser = () => {
		setWaiting(true);
			signupUserAPICall(values)
			.then((response) => {
				handleSignupResponse(response);
			})
			.catch((error) => {
				error.response?.data?.message !== null ? toast.error(error.response.data.message) 
				: toast.error("Could not sign user up!")
			})
			.finally(() => {
				setWaiting(false);
			});
	};

	const { onChange, onSubmit, values } = useForm(signUpUser, initialValue);

	return (
		<div className="Login row">
			<div className="col-6 d-none d-lg-flex primary-container flex-column justify-content-center text-center">
				<div className="wizimg m-3">
					<img src={Wizard} alt="wizard" className="wizard" />
				</div>
				<div className="banner m-2">ElWiz</div>
				<div className="tagline">The Elective Management Wizard</div>
			</div>
			<div className="col-12 col-lg-6 primary d-flex flex-column justify-content-center">
				<div className="logintext text-center on-primary-text">
					SIGN UP
				</div>
				<div className="form m-3 p-5 d-flex flex-column">
					<div className="formhead m-2">Email</div>
					<input
						type="text"
						className="form-control shadow-none"
						name="email"
						onChange={onChange}
					/>

					<div className="formhead m-2">Password</div>
					<input
						type="password"
						className="form-control shadow-none"
						name="password"
						onChange={onChange}
					/>

					<div className="formhead m-2">Confirm Password</div>
					<input
						type="password"
						className="form-control shadow-none"
						name="conf"
						onChange={onChange}
					/>

					<div className="formhead m-2">Name</div>
					<input
						type="text"
						className="form-control shadow-none"
						name="name"
						onChange={onChange}
					/>

					<div className="formhead m-2">Role</div>
					<div className="dropdown">
						<button
							className="btn btn-secondary dropdown-toggle"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{values.role}
						</button>
						<ul className="dropdown-menu">
							{roles.map((role, index) => {
								return (
									<li key={index}>
										<button
											className="dropdown-item"
											type="button"
											name="role"
											value={role}
											onClick={onChange}
										>
											{role}
										</button>
									</li>
								);
							})}
						</ul>
					</div>
					{waiting ? (
						<Spinner className="align-self-end m-2 on-primary-text" />
					) : (
						<button
							className="btn btn-primary align-self-end m-2"
							onClick={onSubmit}
						>
							Sign Up
						</button>
					)}
				</div>
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
				/>
			</div>
		</div>
	);
};

export default Signup;
