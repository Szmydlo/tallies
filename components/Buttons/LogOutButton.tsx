import { Action } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const LogOutButton = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	return (
		<button
			onClick={async () => {
				dispatch(authActions.logout() as Action);
				await router.push("/");
			}}
			className="py-5 px-3"
		>
			Log out
		</button>
	);
};

export default LogOutButton;
