import axios from "axios";
import { VITE_API_GATEWAY_BASE_URL } from "../config";

export const loginUserAPICall = (values) => {
  return axios.post(`${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/login`, values, {
    headers: {
      "Content-Type": "application/json",
    },
  })
};

export const signupUserAPICall = (values) => {
  return axios.post(`${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/signup`, values, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const logoutUserAPICall = () => {
  return axios.get(`${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const fetchStudentListAPICall = () => {
  return axios.get(`${VITE_API_GATEWAY_BASE_URL}/elective-service/student`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const fetchElectiveListAPICall = () => {
  return axios.get(`${VITE_API_GATEWAY_BASE_URL}/elective-service/elective`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const fetchStudentDetailsAPICall = (emailId) => {
  return axios.get(`${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const fetchElectiveDetailsAPICall = (code) => {
  return axios.get(`${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const fetchStudentElectivesAPICall = (emailId) => {
  return axios.get(`${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}/elective`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const fetchElectiveStudentsAPICall = (code) => {
  return axios.get(`${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}/student`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const updateStudentDetails = (studentObject) => {
  return axios.put(`${VITE_API_GATEWAY_BASE_URL}/elective-service/student`, studentObject, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const updateElectiveDetails = (electiveObject) => {
  return axios.put(`${VITE_API_GATEWAY_BASE_URL}/elective-service/elective`, electiveObject, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const addElectiveByIdAPICall = (associationObject) => {
  return axios.post(`${VITE_API_GATEWAY_BASE_URL}/elective-service/student/elective`, associationObject, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const deleteStudentByIdAPICall = (emailId) => {
  return axios.delete(`${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const deleteElectiveByIdAPICall = (code) => {
  return axios.delete(`${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const removeStudentElectiveById = (dissociationObject) => {
  return axios.delete(`${VITE_API_GATEWAY_BASE_URL}/elective-service/student/elective`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}