import '../Login/Login.scss'
import Wizard from '../../assets/wizard.png'
import { useState } from 'react'

const Signup = ()=>{

    const [gender, setGender] = useState("Male")

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
                <input type="text" className="form-control shadow-none" />
                <div className="formhead m-2">Password</div>
                <input type="password" className="form-control shadow-none" />
                <div className="formhead m-2">Confirm Password</div>
                <input type="password" className="form-control shadow-none" />
                <div className="formhead m-2">Name</div>
                <input type="text" className="form-control shadow-none" />
                <div className="formhead m-2">Gender</div>
                <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {gender}
                </button>
                <ul className="dropdown-menu">
                    <li onClick={()=>{setGender("Male")}} className='dropdown-item'>Male</li>
                    <li onClick={()=>{setGender("Female")}}className='dropdown-item'>Female</li>
                    <li onClick={()=>{setGender("Other")}} className='dropdown-item'>Other</li>
                </ul>
                </div>
                <button className="btn btn-primary align-self-end m-2">
                    Sign Up
                </button>
            </div>
        </div>
    </div>
}

export default Signup;