import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: null,
    isFetching: false,
    error: [],
    msg: "",
  },
  reducers: {
    getAllStart: (state) => {
      state.isFetching = true;
    },
    getAllSuccess: (state, action) => {
      state.isFetching = false;
      state.allUsers = action.payload;
    },
    getAllUserFailed: (state, action) => {
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.isFetching = true;
    },
    deleteUserSucess: (state, action) => {
      state.isFetching = false;
      state.msg = action.payload; 
    },
    deleteUserFailed: (state, action) => {
      state.isFetching = true;
      state.msg = action.payload;
    },
  },
});

export const {
  getAllStart,
  getAllSuccess,
  getAllFailed,
  deleteUserStart,
  deleteUserSucess,
  deleteUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
