import React, { useRef } from "react";

import { Action } from "@reduxjs/toolkit";
import PrimaryButton from "../Buttons/PrimaryButton";
import { authActions } from "../../store/auth";
import { supabase } from "../../supabase-client";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useRouter } from "next/router";

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
		if (session) {
			props.onSuccess();
			dispatch(authActions.login() as Action);
			try {
				await router.push("/overview");
			} catch (e) {
				throw new Error(e as string);
			}
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
				pattern: {
					value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
					message:
						"Password must contain: minimum 8 characters, one uppercase letter," +
						"one lowercase, one number and one special character (@$!%*#?&)",
				},
			},
			email: {
				required: {
					value: true,
					message: "Email is required",
				},
				pattern: {
					value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					message: "Email must match RFC 5322 Official Standard",
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
				<PrimaryButton type="submit" text="Login" />
			</div>
		</form>
	);
};

export default LoginInputs;
