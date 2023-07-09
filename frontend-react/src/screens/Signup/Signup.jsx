import "../Login/Login.scss";
import Wizard from "../../assets/wizard.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf, setConf] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("OFFICE_ADMIN");

  const [waiting, setWaiting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpUser = () => {
    let data = JSON.stringify({
      email: email,
      password: password,
      name: name,
      role: role,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8001/auth-service/v1/signup",
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
          navigate("/login");
        } else {
          throw new Error("Auth failed");
        }
      })
      .catch((error) => {
        toast.error("Could not sign user up!");
      })
      .finally(() => {
        setWaiting(false);
      });
  };

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
        <div className="logintext text-center on-primary-text">SIGN UP</div>
        <div className="form m-3 p-5 d-flex flex-column">
          <div className="formhead m-2">Email</div>
          <input type="text" className="form-control shadow-none"  onChange={(event)=>{
                setEmail(event.target.value)
            }}
          />
          <div className="formhead m-2">Password</div>
          <input type="password" className="form-control shadow-none"  onChange={(event)=>{
                setPassword(event.target.value)
            }}
          />
          <div className="formhead m-2">Confirm Password</div>
          <input type="password" className="form-control shadow-none"  onChange={(event)=>{
                setConf(event.target.value)
            }}
          />
          <div className="formhead m-2"  onChange={(event)=>{
                setName(event.target.value)
            }}
          >Name</div>
          <input type="text" className="form-control shadow-none" />
          <div className="formhead m-2">Role</div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {role}
            </button>
            <ul className="dropdown-menu">
              <li
                onClick={() => {
                  setRole("OFFICE_ADMIN");
                }}
                className="dropdown-item"
              >
                OFFICE_ADMIN
              </li>
              <li
                onClick={() => {
                  setRole("TEACHER_ADMIN");
                }}
                className="dropdown-item"
              >
                TEACHER_ADMIN
              </li>
              <li
                onClick={() => {
                  setRole("STUDENT_ADMIN");
                }}
                className="dropdown-item"
              >
                STUDENT_ADMIN
              </li>
            </ul>
          </div>
          {   
            waiting ? 
                <Spinner className="align-self-end m-2 on-primary-text"/> :
                <button
                className="btn btn-primary align-self-end m-2"
                onClick={signUpUser}
              >
                Sign Up
              </button>
            }
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
