import './Navbar.scss'
import logo from '../../assets/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname;
    return <div className="Navbar d-flex">
        <img src={logo} alt="logo" className="navlogo align-self-start"
            onClick={()=>{navigate("/")}}
        />
        <button className="btn btn-primary"
            onClick={()=>{
              if(route === "/login"){
                navigate("/signup")
              }else navigate("/login")
            }}
        >
            {
                route === "/login" ? 
                "Sign Up" : "Log In"
            }
        </button>
    </div>
}

export default Navbar;