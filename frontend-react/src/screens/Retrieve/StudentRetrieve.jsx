import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

import { updateStudentDetails } from "../../services";
import { setStudents } from "../../store";
import "./table.scss";
const StudentRetrieve = ({
	students,
}) => {
	const dispatch = useDispatch();
	const [editing, setEditing] = useState({});

	const handleDoubleClick = (email, field) => {
		setEditing({ email, field });
	};

	const handleBlur = async (email, field, value, otherField, otherFieldValue) => {
		try {
            const newStudentObject = {
                email,
                [field]: value,
                [otherField]: otherFieldValue
            }
            await updateStudentDetails(newStudentObject);
			const newStudentList = students.map((student) => {
				if (student.email === email) {
					return { ...student, [field]: value };
				}
				return student;
			})
			dispatch(setStudents(newStudentList));
			setEditing({});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container tableWrapper">
			<h1>Student List</h1>
			<div className="purplebg">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Email</th>
							<th>Name</th>
							<th>Phone Number</th>
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
									onDoubleClick={() =>
										handleDoubleClick(student.email, "name")
									}
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
										handleDoubleClick(
											student.email,
											"phoneNumber"
										)
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
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default StudentRetrieve;
