import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, Card, Form, Spinner } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";

import {
  addElectiveByIdAPICall,
  fetchElectiveDetailsAPICall,
  fetchElectiveStudentsAPICall,
  removeStudentElectiveById,
} from "../../services";
import { useSelector } from "react-redux";

const ElectiveDetails = ({ students }) => {
  const code = useParams().code;
  const [possibleNewStudents, setPossibleNewStudents] = useState([]);
  const [electiveDetails, setElectiveDetails] = useState({});
  const [electiveStudents, setElectiveStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({});
  const [waiting, setWaiting] = useState(false);

  const token = useSelector((state) => state.token);

  const fetchData = async () => {
    setWaiting(true);
    const electiveDetails = await fetchElectiveDetailsAPICall(code, token);
    const electiveStudents = await fetchElectiveStudentsAPICall(code, token);
    setWaiting(false);
    setElectiveDetails(electiveDetails.data);
    setElectiveStudents(electiveStudents.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const possibleNewStudents = students.filter(
      (student) =>
        !electiveStudents.some(
          (electiveStudent) => electiveStudent.email === student.email
        )
    );
    setPossibleNewStudents(possibleNewStudents);
  }, [students, electiveStudents]);

  const handleAddStudent = async () => {
    const associationObject = {
      studentId: newStudent.email,
      electiveId: electiveDetails.code,
      joiningDate: new Date(),
    };
    setWaiting(true);
    try {
      const response = await addElectiveByIdAPICall(associationObject, token);
      if (response.status === 200) {
        setElectiveStudents([...electiveStudents, newStudent]);
      }
      setNewStudent({});
    } finally{
      setWaiting(false)
    }
  };

  const handleRemoveStudent = async (studentId) => {
    const dissociationObject = {
      studentId: studentId,
      electiveId: electiveDetails.code,
    };
    try {
      setWaiting(true);
      const response = await removeStudentElectiveById(
        dissociationObject,
        token
      );
      if (response.status === 200) {
        setElectiveStudents(
          electiveStudents.filter(
            (electiveStudent) => electiveStudent.email !== studentId
          )
        );
        // update the possibleNewStudents
        const possibleNewStudents = students.filter(
          (student) =>
            !electiveStudents.some(
              (electiveStudent) => electiveStudent.email === student.email
            )
        );
        setPossibleNewStudents(possibleNewStudents);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <div className="container tableWrapper">
      <Modal
        show={waiting}
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
              <h2>Elective Details</h2>
              <Card.Title>{electiveDetails.name}</Card.Title>
              <Card.Subtitle>{electiveDetails.code}</Card.Subtitle>
              <Card.Text>{electiveDetails.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-12">
          <Card>
            <Card.Body>
              <h2>Add Student</h2>
              <Form>
                <Form.Group controlId="newStudent">
                  <Form.Label>Select a Student</Form.Label>
                  <Form.Control
                    as="select"
                    value={newStudent.email || ""}
                    onChange={(e) => {
                      setNewStudent(
                        possibleNewStudents.find(
                          (student) => student.email === e.target.value
                        ) || {}
                      );
                    }}
                  >
                    <option value="">Select a Student</option>
                    {possibleNewStudents.map((student) => (
                      <option key={student.email} value={student.email}>
                        {student.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleAddStudent}>
                  Add Student
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-12">
          <Card>
            <Card.Body>
              <h2>Elective Students</h2>
              <div className="purplebg">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {electiveStudents.map((student) => (
                      <tr key={student.email}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phoneNumber}</td>
                        <td>
                          <Button
                            className="btn-primary"
                            onClick={() => {
                              handleRemoveStudent(student.email);
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

export default ElectiveDetails;
