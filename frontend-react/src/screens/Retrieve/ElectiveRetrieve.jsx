import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button, Spinner} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-bootstrap/Modal";

import {
  deleteElectiveByIdAPICall,
  updateElectiveDetails,
} from "../../services";
import { setElectives } from "../../store";
import "./table.scss";

const ElectiveRetrieve = ({ electives }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState({});
  const [checked, setChecked] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const handleDoubleClick = (code, field) => {
    setEditing({ code, field });
  };
  const token = useSelector((state) => state.token);

  const handleBlur = async (
    code,
    field,
    value,
    otherField,
    otherFieldValue
  ) => {
    try {
      // todo: create backend call
      const newElectiveObject = {
        code,
        [field]: value,
        [otherField]: otherFieldValue,
      };
      setWaiting(true);
      await updateElectiveDetails(newElectiveObject, token);
      const newElectiveList = electives.map((elective) => {
        if (elective.code === code) {
          return {
            ...elective,
            [field]: value,
          };
        }
        return elective;
      });
      dispatch(setElectives(newElectiveList));
      setEditing({});
    } catch (error) {
      console.log(error);
    } finally {
      setWaiting(false);
    }
  };

  const handleDeleteElective = async (code) => {
    try {
      setWaiting(true);
      const response = await deleteElectiveByIdAPICall(code, token);
      if (response.status === 200) {
        const newElectiveList = electives.filter(
          (elective) => elective.code !== code
        );
        dispatch(setElectives(newElectiveList));
      }
    } catch (error) {
      toast.error("Please remove all students from the elective to delete it.");
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

      <h1>Elective List</h1>

      <div className="tableBg">
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
            {electives.map((elective) => (
              <tr key={elective.code}>
                <td>
                  <Link
                    to={`/elective/details/${elective.code}`}
                    className="link"
                  >
                    {elective.code}
                  </Link>
                </td>
                <td
                  onDoubleClick={() => handleDoubleClick(elective.code, "name")}
                >
                  {editing.code === elective.code &&
                  editing.field === "name" ? (
                    <input
                      type="text"
                      defaultValue={elective.name}
                      onBlur={(event) =>
                        handleBlur(
                          elective.code,
                          "name",
                          event.target.value,
                          "description",
                          elective.description
                        )
                      }
                    />
                  ) : (
                    elective.name
                  )}
                </td>
                <td
                  onDoubleClick={() =>
                    handleDoubleClick(elective.code, "description")
                  }
                >
                  {editing.code === elective.code &&
                  editing.field === "description" ? (
                    <input
                      type="text"
                      defaultValue={elective.description}
                      onBlur={(event) =>
                        handleBlur(
                          elective.code,
                          "description",
                          event.target.value,
                          "name",
                          elective.name
                        )
                      }
                    />
                  ) : (
                    elective.description
                  )}
                </td>
                {/* <td
									onDoubleClick={() =>
										handleDoubleClick(
											elective.description,
											"description"
										)
									}
								>
									{editing.code === elective.code &&
									editing.field === "description" ? (
										<input
											type="text"
											defaultValue={elective.description}
											onBlur={(event) =>
												handleBlur(
													elective.code,
													"description",
													event.target.value,
													"name",
													elective.name
												)
											}
										/>
									) : (
										elective.description
									)}
								</td> */}
                <td>
                  <Button
                    className="btn-primary"
                    onClick={() => {
                      handleDeleteElective(elective.code);
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

export default ElectiveRetrieve;
