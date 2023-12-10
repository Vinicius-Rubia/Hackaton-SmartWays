import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import chatSlice from "./chatSlice";
import modalSlice from "./modalSlice";

const combinedReducer = combineReducers({
  modalModel: modalSlice,
  chatModel: chatSlice,
  authModel: authSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "CLEAR") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
