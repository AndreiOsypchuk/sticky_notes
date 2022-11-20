import axios from "axios";

export const Requester = axios.create({
  baseURL: process.env.REACT_APP_API,
});
