import axios from "axios";
import { VITE_API_GATEWAY_BASE_URL } from "../config";

export const loginUserAPICall = (values) => {
  const data = JSON.stringify(values);

  // const config = {
  //   method: "post",
  //   maxBodyLength: Infinity,
  //   url: `${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/login`,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: data,
  // };

  // return axios.request(config);
  return axios.post(`${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  })
};

export const signupUserAPICall = (values) => {
  let data = JSON.stringify(values);
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: `${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/signup`,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};
  
  return axios.request(config);
}

export const logoutUserAPICall = () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/logout`,
    headers: {
      "Content-Type": "application/json",
    }
  }

  return axios.request(config);
}

export const fetchStudentListAPICall = () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/student`,
    headers: {
      "Content-Type": "application/json",
    }
  }

  return axios.request(config);
}

export const fetchElectiveListAPICall = () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective`,
    headers: {
      "Content-Type": "application/json",
    }
  } 

  return axios.request(config);
}

export const fetchStudentDetailsAPICall = (emailId) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}`,
    headers: {
      "Content-Type": "application/json",
    }
  }

  return axios.request(config);
}

export const fetchElectiveDetailsAPICall = (code) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}`,
    headers: {
      "Content-Type": "application/json",
    }
  }

  return axios.request(config);
}

export const fetchStudentElectivesAPICall = (emailId) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}/elective`,
    headers: {
      "Content-Type": "application/json",
    }
  }

  return axios.request(config);
}

export const fetchElectiveStudentsAPICall = (code) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}/student`,
    headers: {
      "Content-Type": "application/json",
    }
  }

  return axios.request(config);
}

export const updateStudentDetails = (studentObject) => {
  let data = JSON.stringify(studentObject);
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/student`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data
  }

  return axios.request(config);
}

export const updateElectiveDetails = (electiveObject) => {
  let data = JSON.stringify(electiveObject);
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data
  }

  return axios.request(config);
}

export const addElectiveByIdAPICall = (associationObject) => {
  let data = JSON.stringify(associationObject);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/elective`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data
  }

  return axios.request(config);
}

export const deleteStudentByIdAPICall = (emailId) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}`,
    headers: {
      "Content-Type": "application/json",
    }
  }

  return axios.request(config);
}

export const deleteElectiveByIdAPICall = (code) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}`,
    headers: {
      "Content-Type": "application/json",
    }
  }

  return axios.request(config);
}

export const removeStudentElectiveById = (dissociationObject) => {
  let data = JSON.stringify(dissociationObject);
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/elective`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data
  }

  return axios.request(config);
}