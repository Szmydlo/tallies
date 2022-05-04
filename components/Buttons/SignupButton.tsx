import Link from "next/link";
import React from "react";

const SignupButton = () => {
	return (
		<Link href="/signup">
			<a className="rounded bg-yellow-400 py-2 px-3 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:text-yellow-800">
				Sign up
			</a>
		</Link>
	);
};

export default SignupButton;
