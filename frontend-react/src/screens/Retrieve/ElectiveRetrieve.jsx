import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import axios from "axios"

import {
	updateElectiveDetails,
} from "../../services";
import { setElectives } from "../../store";
import "./table.scss";

var dummy_obj = [{ "Code": "MATH183", "Course": "Mathematics" }, { "Code": "BIBC102", "Course": "Biology/ Biochemistry" }, {
	"Code":
		"PHYS120", "Course": "Physics"
}, { "Code": "MATH109", "Course": "Mathematics" }, {
	"Code": "MATH183", "Course":
		"Mathematics"
}, { "Code": "CHEM40", "Course": "Chemistry and Biochemistry" }]

const recomBadge = () => {
	return (
		<div>
			<a href="#">News <span class="badge">5</span></a><br></br>
		</div>
	)
}

const ElectiveRetrieve = ({
	electives
}) => {
	const dispatch = useDispatch();
	const [editing, setEditing] = useState({});
	const [checked, setChecked] = useState(false);
	const [predictions, setPredictions] = useState([])

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

	useEffect(() => {
		if (predictions.length === 0) {
			var bodyFormData = new FormData();
			bodyFormData.append("sentence", "CSE181 PSYC70 BIBC102 PHYS120 COGS101A");
			axios({
				method: "post",
				url: "https://gpt2-finetuned-updatednew-3m72qfxrbq-el.a.run.app/predict",
				data: bodyFormData,
				headers: { "Content-Type": "multipart/form-data" },
			})
				.then(function (response) {
					//handle success
					console.log(response);
					setPredictions(response.data)
				})
				.catch(function (response) {
					//handle error
					console.log(response);
				});
		}
	})

	return (
		<div className="container tableWrapper">

			<h1>Elective List</h1>
			<div className="row ">
				<div class="form-check form-switch col-6 col-lg-3 nopadding mt-1 ">
					<input class="form-check-input  " type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => {
						setChecked(!checked)
					}} />
					<label class="form-check-label " for="flexSwitchCheckDefault">Show Recommendation (AI)</label>
				</div>
				<div className="col-lg-1 col-6 ">
					{
						predictions.length === 0 ?
							<div class="spinner-border text-secondary" role="status">
								{/* <span class="sr-only">Loading...</span> */}
							</div>
							: <div>

							</div>
					}
				</div>

			</div>




			<div className="tableBg">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Code</th>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>

						{
							checked ?
								predictions.map((elective) => {
									{ console.log(elective) }
									return (
										<tr key={elective.Code}>
											<td>
												<Link
													to={`/elective/details/${elective.Code}`}
													className="link"
												>
													{elective.Code}
												</Link>
											</td>
											<td
												onDoubleClick={() =>
													handleDoubleClick(elective.Code, "name")
												}
											>
												{editing.code === elective.Code &&
													editing.field === "name" ? (
													<input
														type="text"
														defaultValue={elective.Course}
														onBlur={(event) =>
															handleBlur(
																elective.Code,
																"name",
																event.target.value,
																"description",
																elective.Details
															)
														}
													/>
												) : (
													elective.Course
												)}
											</td>
											<td
												onDoubleClick={() =>
													handleDoubleClick(
														elective.Code,
														"description"
													)
												}
											>
												{editing.code === elective.Code &&
													editing.field === "description" ? (
													<input
														type="text"
														defaultValue={""}
														onBlur={(event) =>
															handleBlur(
																elective.Code,
																"description",
																event.target.value,
																"name",
																elective.Course
															)
														}
													/>
												) : (
													elective.Details
												)}
											</td>
											<td>
												<h5><span class="badge badge-pill badge-success">Recommended</span></h5>
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
										</tr>
									)

								})
								: null
						}

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
								<td></td>
							</tr>

						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default ElectiveRetrieve;
