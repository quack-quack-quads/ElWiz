import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

import {
	updateElectiveDetails,
} from "../../services";
import { setElectives } from "../../store";
import "./table.scss";

const ElectiveRetrieve = ({
	electives
}) => {
	const dispatch = useDispatch();
	const [editing, setEditing] = useState({});

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
			dispatch(setElectives(newElectiveList))
			setEditing({});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container tableWrapper">
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
									onDoubleClick={() =>
										handleDoubleClick(elective.code, "name")
									}
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
										handleDoubleClick(
											elective.code,
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
