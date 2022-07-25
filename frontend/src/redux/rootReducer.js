import { combineReducers } from "redux";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  users: userSlice,
});

export default rootReducer;
