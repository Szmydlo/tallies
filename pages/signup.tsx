import React from "react";
import { SignUpForm } from "../components/SignUp/SignUpForm";
import type { NextPage } from "next";

const Signup: NextPage = () => {
	return (
		<div className="mt-4">
			<div className="m-auto mb-8 w-60 text-center">
				New here? Create account
			</div>
			<div className=" flex w-full justify-center">
				<SignUpForm></SignUpForm>
			</div>
		</div>
	);
};

export default Signup;
