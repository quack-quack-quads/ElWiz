import "./Lander.scss";
import Hero from "./Hero";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../../store";
import { useNavigate } from "react-router-dom";

const Lander = () => {
  var hitcount = 0;
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (hitcount === 0) {
      var token = localStorage.getItem("ElWiz_user_data");
      if (token) {
        token = JSON.parse(token);
        const now = new Date();
        const timelapsed = now - new Date(token.set);
        const user = {
          email: token.value.email,
          name: token.value.name,
        };
        if (timelapsed <= 24 * 60 * 60 * 1000 - 10000) {
          dispatcher(login(user));
          console.log("logged in");
          navigate("/dash");
        } else {
          console.log("failed");
          localStorage.removeItem("ElWiz_user_data");
        }
      }
      hitcount++;
    }
  }, [hitcount]);

  return (
    <div className="Lander">
      <Hero data-testid = "hero"/>
    </div>
  );
};

export default Lander;
