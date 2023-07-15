import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaTrash } from "react-icons/fa";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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

  const handleDoubleClick = (code, field) => {
    setEditing({ code, field });
  };

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
      await updateElectiveDetails(newElectiveObject);
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
    }
  };

  const handleDeleteElective = async (code) => {
    try {
      const response = await deleteElectiveByIdAPICall(code);
      if (response.status === 200) {
        const newElectiveList = electives.filter(
          (elective) => elective.code !== code
        );
        dispatch(setElectives(newElectiveList));
      }
    } catch (error) {
		toast.error("Please remove all students from the elective to delete it.")
      console.log(error);
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
