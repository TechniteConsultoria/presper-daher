import axios from "axios";

export const ApiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3333",
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Headers":
  //     "Origin, X-Requested-With, Content-Type, Accept",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTION",
  // },
});
