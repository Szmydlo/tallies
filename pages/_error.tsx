import React, { useEffect, useState } from "react";

import { Action } from "redux";
import Link from "next/link";
import { authActions } from "../store/auth";
import { isLoggedIn } from "../supabase-client";
import { useDispatch } from "react-redux";

const Error = () => {
	const [logged, setLogged] = useState(false);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (isLoggedIn()) {
				setLogged(true);
				dispatch(authActions.login() as Action);
			}
		},
		[
			/* dispatch stable */
		]
	);
	return (
		<>
			{logged ? (
				<>
					<h1>Page Not Found: you got lost</h1>
					<Link href="/overview">
						<a>Go to profile</a>
					</Link>
				</>
			) : (
				<>
					<h1>Page Not Found: please log in first</h1>
					<Link href="/">
						<a>Go back home</a>
					</Link>
				</>
			)}
		</>
	);
};

export default Error;
