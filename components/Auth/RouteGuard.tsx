import React, { ReactNode, useEffect } from "react";

import { Action } from "redux";
import { authActions } from "../../store/auth";
import { isLoggedIn } from "../../supabase-client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

type Props = {
	children: ReactNode;
};

const RouteGuard = (props: Props) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const logIn = async () => {
		dispatch(authActions.login() as Action);
		await router.push("/overview");
	};
	useEffect(
		() => {
			if (!router.pathname.includes("_error")) {
				if (isLoggedIn()) {
					logIn().catch(() => {
						throw new Error(
							"Could not logged into previous session"
						);
					});
				} else {
					// not logged in => redirect to index
					router.push("/").catch(() => {
						throw new Error("Could not return to index page");
					});
				}
			}
		},
		[
			/* dispatch and router stable */
		]
	);
	return <>{props.children}</>;
};

export default RouteGuard;
