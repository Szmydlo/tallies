import { useRouter } from "next/router";
import React, { useRef } from "react";
import { supabase } from "../../supabase-client";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { Action } from "@reduxjs/toolkit";

const LoginInputs = (props: { onSuccess: () => void }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	return (
		<form
			className="mb-2"
			onSubmit={async (e) => {
				e.preventDefault();
				console.log(
					`email: ${email.current?.value as string}, password: ${
						password.current?.value as string
					}`
				);
				const { user, session, error } = await supabase.auth.signIn({
					email: email.current?.value,
					password: password.current?.value,
				});
				console.log(user, session, error);
				if (session) {
					console.log("essa");
					props.onSuccess();
					dispatch(authActions.login() as Action);
					await router.push("/overview");
				}
			}}
		>
			<div className="mb-2 flex">
				<label className="mr-1 block w-40 text-right align-middle">
					Email:
				</label>
				<input
					className="w-60 border-b-2"
					type="email"
					placeholder="example@example.com"
					ref={email}
				></input>
			</div>
			<div className="mb-4 flex">
				<label className="mr-1 block w-40 text-right">Password:</label>
				<input
					className="w-60 border-b-2"
					type="password"
					ref={password}
					autoComplete="off"
				></input>
			</div>
			<div className="flex w-full justify-center ">
				<button
					className="w-18 rounded bg-gray-100 px-3 py-2 text-gray-900 transition duration-300 hover:bg-gray-300 hover:text-gray-800"
					type="submit"
				>
					Login
				</button>
			</div>
		</form>
	);
};

export default LoginInputs;
