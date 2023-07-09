import "./Login.scss";
import Wizard from "../../assets/wizard.png";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [waiting, setWaiting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = () => {
    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8001/auth-service/v1/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    setWaiting(true);
    axios
      .request(config)
      .then((response) => {
        if (response.status == 200) {
          let data = response.data;
          let userData = {
            name: data.user.name,
            email: data.user.email,
          };
          dispatch(login(userData));
          let token = {
            value: userData,
            set: new Date(),
          };
          localStorage.setItem("ElWiz_user_data", JSON.stringify(token));
          navigate("/dash");
        } else {
          throw new Error("Auth failed");
        }
      })
      .catch((error) => {
        toast.error("Invalid credentials. Please try again with valid ones.");
      })
      .finally(() => {
        setWaiting(false);
      });
  };
  return (
    <>
      <div className="Login row">
        <div className="col-6 d-none d-lg-flex primary-container flex-column justify-content-center text-center">
          <div className="wizimg m-3">
            <img src={Wizard} alt="wizard" className="wizard" />
          </div>
          <div className="banner m-2">ElWiz</div>
          <div className="tagline">The Elective Management Wizard</div>
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center purplebg">
          <div className="logintext text-center on-primary-text">LOG IN</div>
          <div className="form m-3 p-5 d-flex flex-column">
            <div className="formhead m-2">Email</div>
            <input
              type="text"
              className="form-control shadow-none"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <div className="formhead m-2">Password</div>
            <input
              type="password"
              className="form-control shadow-none"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {waiting ? (
              <Spinner className="align-self-end m-2 on-primary-text" />
            ) : (
              <button
                className="btn btn-primary align-self-end m-2"
                onClick={loginUser}
              >
                Log in
              </button>
            )}
          </div>
        </div>
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
    </>
  );
};

export default Login;
