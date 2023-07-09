import "./Lander.scss";
import Hero from "./Hero";
import { useSelector } from "react-redux";

const Lander = () => {
  return (
    <div className="Lander">
      <Hero />
    </div>
  );
};

export default Lander;
