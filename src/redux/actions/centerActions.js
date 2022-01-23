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

export const getCenterByIdApi = async (id) => {
  try {
    const url = `/getCenters/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getCenterReportsApi = async (id) => {
  try {
    const url = `/viewTestResults?center=${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw err;
  }
};
