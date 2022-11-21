import axios from "axios";

export const Requester = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const AlphabetAPI = {
  LOGIN_URL: "/auth/login",
  REGISTER_URL: "/auth/register",
};
