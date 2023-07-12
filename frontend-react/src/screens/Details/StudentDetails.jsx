import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, Card, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

import {
	fetchStudentDetailsAPICall,
	fetchStudentElectivesAPICall,
	addElectiveByIdAPICall,
} from "../../services";

const StudentDetails = ({ electives }) => {
	const email = useParams().email;
	const [possibleNewElectives, setPossibleNewElectives] = useState([]);
	const [studentDetails, setStudentDetails] = useState({});
	const [studentElectives, setStudentElectives] = useState([]);
	const [newElective, setNewElective] = useState({});

	const fetchData = async () => {
		const studentDetails = await fetchStudentDetailsAPICall(email);
		const studentElectives = await fetchStudentElectivesAPICall(email);
		setStudentDetails(studentDetails.data);
		setStudentElectives(studentElectives.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

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
		const response = await addElectiveByIdAPICall(associationObject);
		if (response.status === 200) {
			setStudentElectives([...studentElectives, newElective]);
		}
		setNewElective({});
	};

	return (
		<div className="container tableWrapper">
			<div className="row">
				<div className="col-md-12">
					<Card>
						<Card.Body>
							<h2>Student Details</h2>
							<Card.Title>{studentDetails.name}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								{studentDetails.email}
							</Card.Subtitle>
							<Card.Text>
								Phone Number: {studentDetails.phoneNumber}
							</Card.Text>
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
													(elective) =>
														elective.code ===
														e.target.value
												) || {}
											)
										}
									>
										<option value="">
											Select an elective
										</option>
										{possibleNewElectives.map(
											(elective) => (
												<option
													key={elective.code}
													value={elective.code}
												>
													{elective.name}
												</option>
											)
										)}
									</Form.Control>
								</Form.Group>
								<Button
									variant="primary"
									onClick={handleAddElective}
								>
									Add Elective
								</Button>
							</Form>
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
	);
};

export default StudentDetails;
