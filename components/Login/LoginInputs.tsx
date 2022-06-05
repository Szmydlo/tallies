import { useRouter } from "next/router";
import React, { useRef } from "react";
import { supabase } from "../../supabase-client";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { Action } from "@reduxjs/toolkit";
import { useForm } from "../../hooks/useForm";

const LoginInputs = (props: { onSuccess: () => void }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const handleLogin = async () => {
		// useForm checks whether values are available and correct
		const enteredEmail = email.current?.value || "";
		const enteredPassword = password.current?.value || "";
		const { session } = await supabase.auth.signIn({
			email: enteredEmail,
			password: enteredPassword,
		});

		console.log(session);

		if (session) {
			props.onSuccess();
			dispatch(authActions.login() as Action);
			await router.push("/overview");
		}
	};

	const options = {
		onSubmit: handleLogin,
		validations: {
			password: {
				required: {
					value: true,
					message: "Password is required",
				},
			},
			email: {
				required: {
					value: true,
					message: "Email is required",
				},
			},
		},
	};

	const { handleSubmit, handleChange, errors } = useForm(options);
	const handleChangeEmail = handleChange("email");
	const handleChangePassword = handleChange("password");

	return (
		<form className="mb-2" onSubmit={handleSubmit}>
			<div className="mb-2 flex">
				<label className="mr-1 block w-40 text-right align-middle">
					Email:
				</label>
				<input
					className="w-60 border-b-2"
					type="email"
					placeholder="example@example.com"
					ref={email}
					onChange={handleChangeEmail}
				></input>
			</div>
			{errors.email && (
				<p className="-mt-2 text-center text-[8px] text-red-500">
					{errors.email}
				</p>
			)}
			<div className="mb-4 flex">
				<label className="mr-1 block w-40 text-right">Password:</label>
				<input
					className="w-60 border-b-2"
					type="password"
					ref={password}
					autoComplete="off"
					onChange={handleChangePassword}
				></input>
			</div>
			{errors.password && (
				<p className="-mt-4 text-center text-[8px] text-red-500">
					{errors.password}
				</p>
			)}
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
