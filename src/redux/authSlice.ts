import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces";

const initialState: AuthState = {
  isLogged: false,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, { payload }: { payload: boolean }) {
      return { ...state, isLogged: payload };
    },
  },
});

export const { setLogin } = slice.actions;

export const selectAuth = (state: any): AuthState => state.authModel;

export default slice.reducer;
