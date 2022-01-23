import axios from "axios";
import { history } from "../utils/History";

const url =
  process.env.REACT_APP_ENV === "production"
    ? "https://jambcentralserver.herokuapp.com/jamb/"
    : "http://localhost:8000/jamb/";

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const successHandler = (response) => {
  return response;
};

const errorhandler = (error) => {
  const status = error.response;
  if (status === 401) {
    triggerError("Your session has expired! Kindly Login again");
    history.push("/");
  }
};
