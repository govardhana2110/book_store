import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: process.env.REACT_APP_JSON_URL,
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});
const cookie = Cookies.get("authToken");
const request = async (options) => {
  const onSuccess = (res) => {
    return Promise.resolve(res);
  };
  const onError = (err) => {
    return Promise.reject(err.result);
  };
  const commonHeaders = {
    ...(cookie && { Authorization: `Bearer ${cookie}` }),
  };
  try {
    const response = await client({
      ...options,
      headers: {...commonHeaders,...options.headers },
    });
    return onSuccess(response);
  } catch (err) {
    return onError(err);
  }
};
export default request;
