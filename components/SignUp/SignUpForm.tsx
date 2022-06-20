import React, { useRef, useState } from "react";
import { checkIfUserExists, createUser } from "../../supabase-client";

import { Action } from "@reduxjs/toolkit";
import PrimaryButton from "../Buttons/PrimaryButton";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useRouter } from "next/router";

export const SignUpForm = () => {
	const name = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	const [userExists, setUserExists] = useState(false);
	const [creationError, setCreationError] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();

	const handleCreateUser = async () => {
		// useForm checks whether values are available and correct
		const enteredEmail = email.current?.value || "";
		const enteredPassword = password.current?.value || "";
		const enteredName = name.current?.value || "";
		if (!(await checkIfUserExists(enteredEmail))) {
			setUserExists(false);
			const isCreated = await createUser(enteredEmail, enteredPassword, {
				first_name: enteredName,
			});
			if (isCreated) {
				dispatch(authActions.login() as Action);
				try {
					await router.push("/overview");
				} catch (e) {
					throw new Error(e as string);
				}
			} else {
				setCreationError(true);
			}
		} else {
			setUserExists(true);
		}
	};

	const options = {
		onSubmit: handleCreateUser,
		validations: {
			name: {
				required: {
					value: true,
					message: "Name is required",
				},
				pattern: {
					value: /^[A-Z][a-zA-Z]*$/,
					message:
						"Name has to be one word and start with capital letter",
				},
			},
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
	const handleChangeName = handleChange("name");
	const handleChangeEmail = handleChange("email");
	const handleChangePassword = handleChange("password");
	return (
		<form className="w-72" onSubmit={handleSubmit}>
			<div className="mb-4 rounded border-2 border-solid border-black">
				<div className="mb-2">
					<label>First Name: </label>
					<input
						type="text"
						placeholder="Jan"
						ref={name}
						onChange={handleChangeName}
					/>
					{errors.name && (
						<p className="text-[8px] text-red-500">{errors.name}</p>
					)}
				</div>
				<div className="mb-2">
					<label>Email: </label>
					<input
						className={`${
							userExists || creationError
								? "rounded border-2 border-red-500"
								: ""
						}`}
						type="email"
						placeholder="example@example.com"
						ref={email}
						onChange={handleChangeEmail}
					/>
					{errors.email && (
						<p className="text-[8px] text-red-500">
							{errors.email}
						</p>
					)}
					{(userExists || creationError) && (
						<p className="text-[8px] text-red-500">
							There was an error
						</p>
					)}
				</div>
				<div className="mb-2">
					<label>Password: </label>
					<input
						type="password"
						ref={password}
						autoComplete="off"
						onChange={handleChangePassword}
					/>
					{errors.password && (
						<p className="text-[8px] text-red-500">
							{errors.password}
						</p>
					)}
				</div>
			</div>
			<div className="flex justify-center">
				<PrimaryButton type="submit" text="Sign up" />
			</div>
		</form>
	);
};
