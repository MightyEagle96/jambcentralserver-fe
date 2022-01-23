import axios from "../../axios";

export const getAllCenterApi = async () => {
  try {
    const url = `/getCenters`;
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw err;
  }
};
