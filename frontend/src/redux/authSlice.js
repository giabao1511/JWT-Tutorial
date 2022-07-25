import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: [],
    newUser: null,
  },
  reducers: {
    reset: (state) => {
      state.newUser = null;
    },
    // LOGIN REDUCER
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload; 
    },
    loginFailed: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // REGISTER REDUCER
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.newUser = action.payload;
    },
    registerFailed: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // LOGOUT REDUCER
    logoutStart: (state) => {
      state.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null; 
    },
    logoutFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
