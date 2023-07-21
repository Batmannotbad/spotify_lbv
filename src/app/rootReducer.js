import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import songReducer from "../features/songSlice";

const rootReducer = combineReducers({
  user: userReducer,
  song: songReducer,
});

export default rootReducer;