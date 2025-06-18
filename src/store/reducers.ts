import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import extraReducer from "./extraSlice";

const reducer = combineReducers({
  auth: authReducer,
  extra: extraReducer,
});

export { reducer };
