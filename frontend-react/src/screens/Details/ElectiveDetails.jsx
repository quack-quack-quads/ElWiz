import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, Card, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

import {
  addElectiveByIdAPICall,
  fetchElectiveDetailsAPICall,
  fetchElectiveStudentsAPICall
} from "../../services"

const ElectiveDetails = ({
  students,
}) => {
  const code = useParams().code;
  const [possibleNewStudents, setPossibleNewStudents] = useState([]);
  const [electiveDetails, setElectiveDetails] = useState({});
  const [electiveStudents, setElectiveStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({});

  const fetchData = async () => {
    const electiveDetails = await fetchElectiveDetailsAPICall(code);
    const electiveStudents = await fetchElectiveStudentsAPICall(code);
    setElectiveDetails(electiveDetails.data);
    setElectiveStudents(electiveStudents.data); 
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    const possibleNewStudents = students.filter(
      (student) => !electiveStudents.some(
        (electiveStudent) => electiveStudent.email === student.email
      )
    )
    setPossibleNewStudents(possibleNewStudents);
  }, [students, electiveStudents])

  const handleAddStudent = async () => {
    const associationObject = {
      studentId: newStudent.email,
      electiveId: electiveDetails.code,
      joiningDate: new Date(),
    }
    const response = await addElectiveByIdAPICall(associationObject);
    if (response.status === 200) {
      setElectiveStudents([...electiveStudents, newStudent]);
    }
    setNewStudent({});
  }

  return (
    <div className="container tableWrapper">
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
                      )
                    }}
                  >
                    <option value="">
                      Select a Student
                    </option>
                    {possibleNewStudents.map(
                      (student) => (
                        <option
                          key={student.email}
                          value={student.email}
                        >
                          {student.name}
                        </option>
                      )
                    )}
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleAddStudent}
                >
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
                          <Button className="btn-primary">
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

  )
}

export default ElectiveDetails