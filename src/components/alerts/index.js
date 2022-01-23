import Swal from "sweetalert2";
import { getErrorMessage } from "../../utils/ErrorMessage";

// Loading alert modal
export const loadingAlert = (isLoading, message, description) => {
  isLoading
    ? Swal.fire({
        title: message || "Please wait...",
        text: description,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        willOpen: () => {
          Swal.showLoading();
        },
      })
    : Swal.close();
};

// success alert modal
export const successAlert = (message) => {
  Swal.fire({
    title: message || "Successful",
    icon: "success",
    showCancelButton: false,
    showConfirmButton: false,
    timer: 1500,
  });
};

// error alert modal
export const errorAlert = (error) => {
  const message = getErrorMessage(error);
  Swal.fire({
    icon: "error",
    title: message,
    timer: 2500,
  });
};
