import axios from "axios";
import { VITE_API_GATEWAY_BASE_URL } from "../config";

const createAxiosRequest = (method, url, data, token) => {
  return axios({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      "elwiz-auth" : token
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

export const fetchStudentListAPICall = (token) => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student`, null, token);
}

export const createElectiveAPICall = (values, token)=>{
  return createAxiosRequest("post", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective`, values, token)
}

export const createStudentAPICall = (values, token)=>{
  return createAxiosRequest("post", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student`, values, token)
}

export const fetchElectiveListAPICall = (token) => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective`, null, token);
}

export const fetchStudentDetailsAPICall = (emailId, token) => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}`, null, token);
}

export const fetchElectiveDetailsAPICall = (code, token) => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}`, null, token);
}

export const fetchStudentElectivesAPICall = (emailId, token) => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}/elective`, null, token);
}

export const fetchElectiveStudentsAPICall = (code, token) => {
  return createAxiosRequest("get", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}/student`, null, token);
}

export const updateStudentDetails = (studentObject, token) => {
  return createAxiosRequest("put", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student`, studentObject, token);
}

export const updateElectiveDetails = (electiveObject, token) => {
  return createAxiosRequest("put", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective`, electiveObject, token);
}

export const addElectiveByIdAPICall = (associationObject, token) => {
  return createAxiosRequest("post", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/elective`, associationObject, token);
}

export const deleteStudentByIdAPICall = (emailId, token) => {
  return createAxiosRequest("delete", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/${emailId}`, null, token);
}

export const deleteElectiveByIdAPICall = (code, token) => {
  return createAxiosRequest("delete", `${VITE_API_GATEWAY_BASE_URL}/elective-service/elective/${code}`, null, token);
}

export const removeStudentElectiveById = (dissociationObject, token) => {
  return createAxiosRequest("delete", `${VITE_API_GATEWAY_BASE_URL}/elective-service/student/elective`, dissociationObject, token);
}