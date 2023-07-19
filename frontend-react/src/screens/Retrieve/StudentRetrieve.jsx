import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button, Spinner } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-bootstrap/Modal";

import { updateStudentDetails, deleteStudentByIdAPICall } from "../../services";
import { setStudents } from "../../store";
import "./table.scss";


const StudentRetrieve = ({ students }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState({});
  const [waiting, setWaiting] = useState(false);
  const handleDoubleClick = (email, field) => {
    setEditing({ email, field });
  };

  const token = useSelector((state) => state.token);

  const handleBlur = async (
    email,
    field,
    value,
    otherField,
    otherFieldValue
  ) => {
    try {
      const newStudentObject = {
        email,
        [field]: value,
        [otherField]: otherFieldValue,
      };
      setWaiting(true);
      await updateStudentDetails(newStudentObject, token);
      const newStudentList = students.map((student) => {
        if (student.email === email) {
          return { ...student, [field]: value };
        }
        return student;
      });
      dispatch(setStudents(newStudentList));
      setEditing({});
    } catch (error) {
      console.log(error);
    } finally {
      setWaiting(false);
    }
  };

  const handleDeleteStudent = async (email) => {
    try {
      setWaiting(true);
      const response = await deleteStudentByIdAPICall(email, token);
      if (response.status === 200) {
        const newStudentList = students.filter(
          (student) => student.email !== email
        );
        dispatch(setStudents(newStudentList));
      }
    } catch (error) {
      toast.error("Please remove all electives from the student to delete it.");
      console.log(error);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <div className="container tableWrapper">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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

      <h1>Student List</h1>
      <div className="tableBg">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.email}>
                <td>
                  <Link
                    to={`/student/details/${student.email}`}
                    className="link"
                  >
                    {student.email}
                  </Link>
                </td>
                <td
                  onDoubleClick={() => handleDoubleClick(student.email, "name")}
                >
                  {editing.email === student.email &&
                  editing.field === "name" ? (
                    <input
                      type="text"
                      defaultValue={student.name}
                      onBlur={(event) =>
                        handleBlur(
                          student.email,
                          "name",
                          event.target.value,
                          "phoneNumber",
                          student.phoneNumber
                        )
                      }
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td
                  onDoubleClick={() =>
                    handleDoubleClick(student.email, "phoneNumber")
                  }
                >
                  {editing.email === student.email &&
                  editing.field === "phoneNumber" ? (
                    <input
                      type="text"
                      defaultValue={student.phoneNumber}
                      onBlur={(event) =>
                        handleBlur(
                          student.email,
                          "phoneNumber",
                          event.target.value,
                          "name",
                          student.name
                        )
                      }
                    />
                  ) : (
                    student.phoneNumber
                  )}
                </td>
                <td>
                  <Button
                    className="btn-primary"
                    onClick={() => {
                      handleDeleteStudent(student.email);
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
    </div>
  );
};

export default StudentRetrieve;
