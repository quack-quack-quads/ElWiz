import "./Navbar.scss";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store";
import { logoutUserAPICall } from "../../services"
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname;

  var user = useSelector((state) => state.user);
  const [auth, setAuth] = useState(false)

  useEffect(()=>{
    setAuth(user.email != null)
  }, [user])
  const dispatcher = useDispatch()

  const logoutUser = ()=>{
    logoutUserAPICall()
    .then((response)=>{
      console.log(response.data)
      dispatcher(logout())
      setAuth(false)
      navigate("/") 
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className="Navbar d-flex">
      <img
        src={logo}
        alt="logo"
        className="navlogo align-self-start"
        onClick={() => {
          if (auth) {
            navigate("/dash");
          } else navigate("/");
        }}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          if (auth) {
            logoutUser();
          } else {
            if (route === "/login") {
              navigate("/signup");
            } else navigate("/login");
          }
        }}
      >
        { auth ? "Log out" : route === "/login" ? "Sign Up" : "Log In"}
      </button>
    </div>
  );
};

export default Navbar;
