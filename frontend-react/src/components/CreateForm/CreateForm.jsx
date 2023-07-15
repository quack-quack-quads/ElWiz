import "./CreateForm.scss";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

const CreateForm = ({ fields, entity, heading, description, submithandler}) => {
  return (
    <div className="wrapper purplebg d-flex justify-content-center">
      <div className="CreateScreen d-flex flex-column align-items-center p-5">
        <div className="message">
          <div className="heading on-primary-text text-center">{heading}</div>
          <div className="description text-center">{description}</div>
        </div>
        <div className="CreateForm">
          {fields.map((field) => {
            return (
              <MDBInput
                className="mb-4 mdbinput"
                key={field.label}
                type={field.type}
                label={field.label}
                onChange={(event) => {
                  field.action(event.target.value);
                }}
              />
            );
          })}
          <MDBBtn type="submit" block className="submitbtn"
            onClick={submithandler}
          >
            Create {entity}
          </MDBBtn>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
