import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, Card, Form, Spinner } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import {
  fetchStudentDetailsAPICall,
  fetchStudentElectivesAPICall,
  addElectiveByIdAPICall,
  removeStudentElectiveById,
} from "../../services";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

const StudentDetails = ({ electives }) => {
  const email = useParams().email;
  const [possibleNewElectives, setPossibleNewElectives] = useState([]);
  const [studentDetails, setStudentDetails] = useState({});
  const [studentElectives, setStudentElectives] = useState([]);
  const [newElective, setNewElective] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [waiting, setWaiting] = useState(true);

  const [waitingModal, setWaitingModal] = useState(false);
  const token = useSelector((state) => state.token);

  const fetchData = async () => {
    setWaitingModal(true);
    const studentDetails = await fetchStudentDetailsAPICall(email, token);
    const studentElectives = await fetchStudentElectivesAPICall(email, token);
    setWaitingModal(false);
    setStudentDetails(studentDetails.data);
    setStudentElectives(studentElectives.data);
  };

  useEffect(() => {
    if (!fetched) {
      fetchData();
      setFetched(true);
    }
  }, []);

  useEffect(() => {
    if (predictions.length === 0 && fetched) {
      var bodyFormData = new FormData();
      var sentence = "";
      studentElectives.forEach((e) => {
        sentence += e.code.toString().trim() + " ";
      });
      bodyFormData.append("sentence", sentence);
      axios({
        method: "post",
        url: "https://gpt2-finetuned-updatednew-3m72qfxrbq-el.a.run.app/predict",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
          setPredictions(response.data);
          setWaiting(false);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  });

  useEffect(() => {
    const possibleNewElectives = electives.filter(
      (elective) =>
        !studentElectives.some(
          (studentElective) => studentElective.code === elective.code
        )
    );
    setPossibleNewElectives(possibleNewElectives);
  }, [electives, studentElectives]);

  const handleAddElective = async () => {
    const associationObject = {
      studentId: studentDetails.email,
      electiveId: newElective.code,
      joiningDate: new Date(),
    };
    try {
      setWaitingModal(true);
      const response = await addElectiveByIdAPICall(associationObject, token);
      if (response.status === 200) {
        setStudentElectives([...studentElectives, newElective]);
      }
      setNewElective({});
    } finally {
      setWaitingModal(false);
    }
  };

  const handleRemoveElective = async (electiveId) => {
    const dissociationObject = {
      studentId: studentDetails.email,
      electiveId: electiveId,
    };
    try {
      setWaitingModal(true);
      const response = await removeStudentElectiveById(
        dissociationObject,
        token
      );
      if (response.status === 200) {
        const newStudentElectives = studentElectives.filter(
          (elective) => elective.code !== electiveId
        );
        setStudentElectives(newStudentElectives);
        // update the possible new electives
        const possibleNewElectives = electives.filter(
          (elective) =>
            !newStudentElectives.some(
              (studentElective) => studentElective.code === elective.code
            )
        );
        setPossibleNewElectives(possibleNewElectives);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setWaitingModal(false);
    }
  };

  return (
    <div className="container tableWrapper">
      <Modal
        show={waitingModal}
        onHide={() => {
          setWaiting(false);
        }}
        centered
        size="sm"
      >
        <Modal.Body className="text-center">
          <Spinner style={{ margin: "5vh 0" }} />
        </Modal.Body>
      </Modal>
      <div className="row">
        <div className="col-md-12">
          <Card>
            <Card.Body>
              <h2>Student Details</h2>
              <Card.Title>{studentDetails.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {studentDetails.email}
              </Card.Subtitle>
              <Card.Text>Phone Number: {studentDetails.phoneNumber}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-12">
          <Card>
            <Card.Body>
              <h2>Add Elective</h2>
              <Form>
                <Form.Group controlId="newElective">
                  <Form.Label>Select an Elective</Form.Label>
                  <Form.Control
                    as="select"
                    value={newElective.code || ""}
                    onChange={(e) =>
                      setNewElective(
                        possibleNewElectives.find(
                          (elective) => elective.code === e.target.value
                        ) || {}
                      )
                    }
                  >
                    <option value="">Select an elective</option>
                    {possibleNewElectives.map((elective) => (
                      <option key={elective.code} value={elective.code}>
                        {elective.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleAddElective}>
                  Add Elective
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-12">
          <Card>
            <Card.Body>
              <h2>Recommended Electives</h2>
              {waiting ? (
                <Spinner style={{ margin: "40px" }} />
              ) : (
                <div className="purplebg">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {predictions.map((elective) => (
                        <tr key={elective.Code}>
                          <td>{elective.Code}</td>
                          <td>{elective.Course}</td>
                          <td>{elective.Details}</td>
                          <td>
                            <span className="recommended">Recommended</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-12">
          <Card>
            <Card.Body>
              <h2>Student Electives</h2>
              <div className="purplebg">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentElectives.map((elective) => (
                      <tr key={elective.code}>
                        <td>{elective.code}</td>
                        <td>{elective.name}</td>
                        <td>{elective.description}</td>
                        <td>
                          <Button
                            className="btn-primary"
                            onClick={() => {
                              handleRemoveElective(elective.code);
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
