import "./Hero.scss";
import Wizard from "../../assets/wizard.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="Hero row">
      <div className="col-12 col-md-5 col-lg-6 d-flex justify-content-center align-items-center">
        <img src={Wizard} alt="wizard" className="herowiz" />
      </div>
      <div className="col-12 col-md-7 col-lg-6 d-flex justify-content-center align-items-center p-5">
        <div className="herotext primary-container d-flex flex-column p-3 text-center">
          <div className="heading">ElWiz</div>
          <div className="tagline">The elective Management Wizard</div>
          <div className="description m-3">
            Welcome to our powerful application designed to streamline your
            student management tasks! With our user-friendly interface, you can
            effortlessly perform all essential CRUD operations on both students
            and electives. Whether you need to add, edit, or delete student or
            elective records, our application provides the tools you need for
            efficient data management. But that's not all! We also offer the
            ability to assign students to electives and vice versa, empowering
            you to easily organize and track their academic journeys. If that's not enough, you will surely like a boost to your electives-picking process using the power of <b>Machine Learning!!!</b>
          </div>
          <button className="btn btn-secondary align-self-end m-3"
            onClick={()=>{
                navigate("/login")
            }}
          >
            Log in now to manage resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
