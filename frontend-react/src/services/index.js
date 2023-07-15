import axios from "axios";
import { VITE_API_GATEWAY_BASE_URL } from "../config";

const createAxiosRequest = (method, url, data) => {
  return axios({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export const loginUserAPICall = (values) => {
  return createAxiosRequest("post", `${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/login`, values);
};

export const signupUserAPICall = (values) => {
  return createAxiosRequest("post", `${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/signup`, values);
}

export const logoutUserAPICall = () => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/logout`);
}

export const fetchStudentListAPICall = () => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student`);
}

export const createElectiveAPICall = (values)=>{
  return createAxiosRequest("post", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective`, values)
}

export const createStudentAPICall = (values)=>{
  return createAxiosRequest("post", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student`, values)
}

export const fetchElectiveListAPICall = () => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective`);
}

export const fetchStudentDetailsAPICall = (emailId) => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}`);
}

export const fetchElectiveDetailsAPICall = (code) => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}`);
}

export const fetchStudentElectivesAPICall = (emailId) => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}/elective`);
}

export const fetchElectiveStudentsAPICall = (code) => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}/student`);
}

export const updateStudentDetails = (studentObject) => {
  return createAxiosRequest("put", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student`, studentObject);
}

export const updateElectiveDetails = (electiveObject) => {
  return createAxiosRequest("put", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective`, electiveObject);
}

export const addElectiveByIdAPICall = (associationObject) => {
  return createAxiosRequest("post", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/elective`, associationObject);
}

export const deleteStudentByIdAPICall = (emailId) => {
  return createAxiosRequest("delete", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}`);
}

export const deleteElectiveByIdAPICall = (code) => {
  return createAxiosRequest("delete", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}`);
}

export const removeStudentElectiveById = (dissociationObject) => {
  return createAxiosRequest("delete", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/elective`, dissociationObject);
}