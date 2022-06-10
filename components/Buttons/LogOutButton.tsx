import { clearSession, supabase } from "../../supabase-client";

import { Action } from "@reduxjs/toolkit";
import React from "react";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const LogOutButton = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	return (
		<button
			onClick={async () => {
				try {
					clearSession();
					await supabase.auth.signOut();
					dispatch(authActions.logout() as Action);
					await router.push("/");
				} catch (e) {
					throw new Error(e as string);
				}
			}}
			className="py-5 px-3"
		>
			Log out
		</button>
	);
};

export default LogOutButton;
