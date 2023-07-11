import axios from "axios";
import { VITE_API_GATEWAY_BASE_URL } from "../config";

export const loginUserAPICall = (values) => {
  const data = JSON.stringify(values);

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${VITE_API_GATEWAY_BASE_URL}/auth-service/v1/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios.request(config);
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