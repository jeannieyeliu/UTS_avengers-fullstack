import axios from "axios";
import config from "config.json";
// import Logger from "../services/logService";

axios.defaults.baseURL = config.baseURL;

axios.interceptors.response.use(null, (error) => {
  // error.request //if submit to server succcessfuly request will be set, otherwise will be null
  // error.response //if there is no response from server, response will be null
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    //unexpected error
    // window.App.notify("tc", "An unexpected error occurred", "warning");
    // Logger.logError(error);
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  patch: axios.patch
};
