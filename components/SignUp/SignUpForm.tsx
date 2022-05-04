import React, { useRef, useState } from "react";
import { checkIfUserExists, createUser } from "../../supabase-client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { Action } from "@reduxjs/toolkit";

export const SignUpForm = () => {
	const name = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	const [userExists, setUserExists] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	return (
		<form
			className="w-72"
			onSubmit={async (e) => {
				e.preventDefault();
				const enteredEmail = email.current?.value as string;
				const enteredPassword = password.current?.value as string;
				const enteredName = name.current?.value as string;
				if (!(await checkIfUserExists(enteredEmail))) {
					setUserExists(false);
					const isCreated = await createUser(
						enteredEmail,
						enteredPassword,
						{
							first_name: enteredName,
						}
					);
					if (isCreated) {
						console.log("User successfully created!");
						dispatch(authActions.login() as Action);
						await router.push("/overview");
					}
				} else {
					setUserExists(true);
				}
			}}
		>
			<div className="mb-4 rounded border-2 border-solid border-black">
				<div className="mb-2">
					<label>First Name: </label>
					<input type="text" placeholder="Jan" ref={name} />
				</div>
				<div className="mb-2">
					<label>Email: </label>
					<input
						className={`${
							userExists ? "rounded border-2 border-red-500" : ""
						}`}
						type="email"
						placeholder="example@example.com"
						ref={email}
					/>
				</div>
				<div className="mb-2">
					<label>Password: </label>
					<input type="password" ref={password} autoComplete="off" />
				</div>
			</div>
			<div className="flex justify-center">
				<button
					className="rounded bg-yellow-400 py-2 px-3 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:text-yellow-800"
					type="submit"
				>
					Sign up
				</button>
			</div>
		</form>
	);
};
