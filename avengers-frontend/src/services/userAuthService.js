import jwtDecode from "jwt-decode";

//References:
//https://github.com/chris0906/csa-frontend

export const isVerifiedUser = () => {
  const token = localStorage.getItem("token");
  try {
    jwtDecode(token);
    return true;
  } catch (ex) {
    return false;
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  try {
    const user = jwtDecode(token);
    return user;
  } catch (ex) {
    return null;
  }
};

export default {
  isVerifiedUser,
  getCurrentUser
};
