import axios from "axios";
import Swal from "sweetalert2";

const devUrl = "http://localhost:8000/jamb/";
const prodUrl = "https://jambcentralserver.herokuapp.com/jamb/";

export const backendUrl =
  process.env.REACT_APP_ENV === "production" ? prodUrl : devUrl;

const AUTH_TOKEN = localStorage.getItem("token") || "";

export const httpService = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
  //withCredentials: "include",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;
    if (response) {
      if (
        response.status === 401 &&
        response.data.message === "Incorrect Email or Password"
      ) {
        Swal.fire({ icon: "error", text: response.data.message });
      } else if (
        response.status === 401 &&
        (response.data.message === "invalid token" ||
          response.data.message === "invalid algorithm" ||
          response.data.message === "jwt must be provided" ||
          response.data.message === "jwt expired")
      ) {
        Swal.fire({
          icon: "warning",
          text: "Unavailable to validate token.",
        }).then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("loggedInUser");
          window.location.assign("/");
        });
      } else if (response.status === 403) {
        Swal.fire({
          icon: "warning",
          titleText: "Access Denied",
          text: response.data.message,
        });
      } else if (response.status === 409) {
        Swal.fire({
          icon: "error",
          titleText: "Can't create",
          text: "Duplicate data found.",
        });
      }
    }
  }
);
