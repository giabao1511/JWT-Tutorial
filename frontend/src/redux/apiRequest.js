import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSucess,
  getAllFailed,
  getAllStart,
  getAllSuccess,
} from "./userSlice";

// LOGIN
export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://giabaojwt.herokuapp.com/v1/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailed(err.message));
  }
};

// REGISTER
export const registerUser = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "https://giabaojwt.herokuapp.com/v1/auth/register",
      user
    );
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailed(err.message));
  }
};

// GETALLUSER
export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getAllStart());
  try {
    const res = await axiosJWT.get(
      "https://giabaojwt.herokuapp.com/v1/user/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getAllSuccess(res.data));
  } catch (err) {
    dispatch(getAllFailed(err.message));
  }
};

// DELETEUSER
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete(
      "https://giabaojwt.herokuapp.com/v1/user/" + id,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteUserSucess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.message));
  }
};

// LOGOUT
export const logoutUser = async (
  accessToken,
  dispatch,
  axiosJWT,
  id,
  navigate
) => {
  dispatch(logoutStart());
  try {
    const res = await axiosJWT.post(
      "https://giabaojwt.herokuapp.com/v1/auth/logout",
      id,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(logoutSuccess(res.data));
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailed(err.message));
  }
};
