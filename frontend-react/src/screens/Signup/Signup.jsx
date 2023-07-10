import '../Login/Login.scss'
import Wizard from '../../assets/wizard.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { useForm } from "../../hooks"

const Signup = ()=>{
    const navigate = useNavigate()

    const roles = [
        "STUDENT_ADMIN",
        "TEACHER_ADMIN",
        "OFFICE_ADMIN"
    ]

    const initialValue = {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        role: roles[0]
    }

    const signUpUser = async() => {
        const url = `${import.meta.env.VITE_API_GATEWAY_BASE_URL}/auth-service/v1/signup`
        axios.post(url, values).then((res) => {
            if(res.data.status === "CREATED") {
                console.log(res.data.message)
                navigate("/login")
            }
        }).catch((err) => {
            // console.log(err.response.data.message)
            console.log(err)
        })
    }

    const { onChange, onSubmit, values } = useForm(signUpUser, initialValue)

    return <div className="Login row">
        <div className="col-6 d-none d-lg-flex primary-container flex-column justify-content-center text-center">
            <div className="wizimg m-3"><img src={Wizard} alt="wizard" className="wizard"/></div>
            <div className="banner m-2">ElWiz</div>
            <div className="tagline">The Elective Management Wizard</div>
        </div>
        <div className="col-12 col-lg-6 primary d-flex flex-column justify-content-center">
            <div className="logintext text-center on-primary-text">
                SIGN UP
            </div>
            <div className="form m-3 p-5 d-flex flex-column">
                <div className="formhead m-2">Email</div>
                <input type="text" className="form-control shadow-none" name="email" onChange={onChange}/>
                <div className="formhead m-2">Password</div>
                <input type="password" className="form-control shadow-none" name="password" onChange={onChange} />
                <div className="formhead m-2">Confirm Password</div>
                <input type="password" className="form-control shadow-none" name="confirmPassword" onChange={onChange}/>
                <div className="formhead m-2">Name</div>
                <input type="text" className="form-control shadow-none" name="name" onChange={onChange}/>
                <div className="formhead m-2">Role</div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {values.role}
                    </button>
                    <ul className="dropdown-menu">
                        {roles.map((role, index)=>{
                            return <li key={index} className='dropdown-item' name="role" onClick={() => {
                                onChange({target: {name: "role", value: role}})
                            }}>{role}</li>
                        })}
                    </ul>
                </div>
                <button className="btn btn-primary align-self-end m-2" onClick={onSubmit}>
                    Sign Up
                </button>
            </div>
        </div>
    </div>
}

export default Signup;