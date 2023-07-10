import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Login.scss'
import Wizard from '../../assets/wizard.png'

import { useForm } from "../../hooks"
import { login } from "../../store"

const Login = ()=> {   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const initialState = {
        email: "",
        password: ""
    }

    const loginUser = async() => {
        // const url = `${import.meta.env.VITE_API_GATEWAY_BASE_URL}/auth-service/v1/login`
        const url = 'http://apiGateway:8001/auth-service/v1/login'
        console.log("calling url:", url)
        axios.post(url, values).then((res) => {
            if(res.data.status === "OK") {
                dispatch(login(res.data.user))
                navigate("/")
            }
        }).catch((err) => {
            // console.log(err.response.data.message)
            console.log(err)
        })
    }

    const { onChange, onSubmit, values } = useForm(loginUser, initialState)

    return <div className="Login row">
        <div className="col-6 d-none d-lg-flex primary-container flex-column justify-content-center text-center">
            <div className="wizimg m-3"><img src={Wizard} alt="wizard" className="wizard"/></div>
            <div className="banner m-2">ElWiz</div>
            <div className="tagline">The Elective Management Wizard</div>
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center purplebg">
            <div className="logintext text-center on-primary-text">
                LOG IN
            </div>
            <div className="form m-3 p-5 d-flex flex-column">
                <div className="formhead m-2">Email</div>
                <input type="text" className="form-control shadow-none" name="email" onChange={onChange}/>
                <div className="formhead m-2">Password</div>
                <input type="password" className="form-control shadow-none" name="password" onChange={onChange}/>
                <button className="btn btn-primary align-self-end m-2" onClick={onSubmit}>
                    Log in
                </button>
            </div>
        </div>
    </div>
}

export default Login;