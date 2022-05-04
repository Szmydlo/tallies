import { createSlice } from "@reduxjs/toolkit";
import { ReducerWithoutAction } from "react";

export interface AuthState {
	isAuth: boolean;
}
const initialAuthState: AuthState = {
	isAuth: false,
};

const login: ReducerWithoutAction<AuthState> = (state) => {
	const newState = { ...state };
	newState.isAuth = true;
	return newState;
};
const logout: ReducerWithoutAction<AuthState> = (state) => {
	const newState = { ...state };
	newState.isAuth = false;
	return newState;
};

const authSlice = createSlice({
	name: "authentication",
	initialState: initialAuthState,
	reducers: { login, logout },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
