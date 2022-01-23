import axios from "axios";
import { history } from "../utils/History";
import { errorAlert } from "../components/alerts";
import store from "store";

const url =
  process.env.REACT_APP_ENV === "production"
    ? "https://jambcentralserver.herokuapp.com/jamb/"
    : "http://localhost:8000/jamb/";

const instance = axios.create({
  baseURL: url,
});

const token = store.get("token");
console.log(token);

instance.interceptors.request.use(
  (config) => {
    const token = store.get("token") || "";

    config.headers["Authorization"] = `Bearer ${token}`;
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

const errorHandler = (error) => {
  const status = error.response;
  if (status === 401) {
    errorAlert("YSession has expired! Kindly Login again");
    history.push("/");
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => {
    return errorHandler(error);
  }
);

export default instance;
