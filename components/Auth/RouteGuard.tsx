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

	useEffect(
		() => {
			const logIn = async () => {
				dispatch(authActions.login() as Action);
				await router.push("/overview");
			};
			if (isLoggedIn()) {
				logIn().catch(() => {
					throw new Error("Could not logged into previous session");
				});
			}
		},
		[
			/* dispatch and router stable */
		]
	);
	return <>{props.children}</>;
};

export default RouteGuard;
