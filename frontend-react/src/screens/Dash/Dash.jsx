import { redirect, useNavigate } from "react-router-dom";
import "./Dash.scss";
import { AiOutlinePlus, AiFillRead } from "react-icons/ai";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";

const Dash = () => {
  const navigate = useNavigate()
  var user = useSelector((state) => state.user);
  
  useEffect(() => {
    if(user.email == null){
      navigate("/")
    }
  }, [user]);

  return (
    <div className="Dash purplebg d-flex flex-column justify-content-evenly">
      <div className="message">
        <div className="greeting p-3 on-primary-text">Hi {user.name}!</div>
        <div className="row">
          <div className="col-12 col-md-7 col-lg-6 intro p-2 text-center">
            This is your consolidated dashboard. Use the options below to
            perform CRUD on students and electives. You can further map students
            to electives and vice-versa using the controls provided on their
            details page.
          </div>
        </div>
      </div>
      <div className="row d-flex flex-wrap">
        <div className="col-12 col-lg-6 d-flex flex-column">
          <div className="optiontitle on-primary-text p-3 m-4">Students</div>
          <div className="options d-flex no-wrap justify-content-start">
            <div className="optiontile d-flex flex-column primary-container align-items-center"
             onClick={()=>{navigate("/student/create")}}
            >
              <AiOutlinePlus size={60} className="m-3" />
              <div className="text">Create</div>
            </div>
            <div className="optiontile d-flex flex-column primary-container align-items-center"
              onClick={()=>{navigate("/student/retrieve")}}
            >
              <AiFillRead size={60} className="m-3" />
              <div className="text">Retrieve</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column">
          <div className="optiontitle on-primary-text p-3 m-4">Electives</div>
          <div className="options d-flex no-wrap justify-content-start">
            <div className="optiontile d-flex flex-column primary-container align-items-center"
              onClick={()=>{navigate("/elective/create")}}
            >
              <AiOutlinePlus size={60} className="m-3" />
              <div className="text">Create</div>
            </div>
            <div className="optiontile d-flex flex-column primary-container align-items-center"
              onClick={()=>{navigate("/elective/retrieve")}}
            >
              <AiFillRead size={60} className="m-3" />
              <div className="text">Retrieve</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
