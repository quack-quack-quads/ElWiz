import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Login.scss'
import Wizard from '../../assets/wizard.png'

import { useForm } from "../../hooks"
import { login, setToken } from "../../store"
import { fetchStudentListAPICall, loginUserAPICall, fetchElectiveListAPICall} from "../../services"
import { setStudents, setElectives } from '../../store'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialState = {
    email: "",
    password: ""
  }

  const [waiting, setWaiting] = useState(false);

  const handleLoginResponse = async (response) => {
    console.log(response)
    if (response.status == 200) {
      let data = response.data;
      let userData = {
        name: data.user.name,
        email: data.user.email,
        token : data.token
      };
      dispatch(login(userData));
      dispatch(setToken(data.token));
      await fetchStudentListAPICall(data.token).then((res)=>{
        dispatch(setStudents(res.data))
      });
      await fetchElectiveListAPICall(data.token).then((res)=>{
        dispatch(setElectives(res.data))
      });
      setWaiting(false)
      navigate("/dash");
    } else {
      toast.error("Something went wrong.")
      setWaiting(false)
    }
  }

  const loginUser = async () => {
    setWaiting(true);
    loginUserAPICall(values)
      .then((response) => {
        handleLoginResponse(response);
      })
      .catch((error) => {
        error.response?.data?.message !== null ? toast.error(error.response.data.message)
          : toast.error("Invalid credentials. Please try again with valid ones.");
        setWaiting(false)
      })
  };

  const { onChange, onSubmit, values } = useForm(loginUser, initialState)

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
              name='email'
              onChange={onChange}
            />
            <div className="formhead m-2">Password</div>
            <input
              type="password"
              className="form-control shadow-none"
              name='password'
              onChange={onChange}
            />
            {waiting ? (
              <Spinner className="align-self-end m-2 on-primary-text" />
            ) : (
              <button
                className="btn btn-primary align-self-end m-2"
                onClick={onSubmit}
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


// https://ec2-54-204-179-141.compute-1.amazonaws.com:8001/elective-service/student
// https://main.d3mi9uffiw1j9y.amplifyapp.com/