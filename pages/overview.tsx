import { useEffect, useState } from "react";

import type { NextPage } from "next";
import { RootState } from "../store";
import { supabase } from "../supabase-client";
import { useSelector } from "react-redux";

type User = {
	email: string;
};

const Overview: NextPage = () => {
	const isAuth = useSelector<RootState, boolean>(
		(state) => state.auth.isAuth
	);

	const [users, setUsers] = useState<User[]>();

	useEffect(() => {
		const readUsers = async () => {
			const { data } = await supabase.from("users").select("email");

			setUsers(data as User[]);
		};
		readUsers().catch(() => {
			throw new Error("Could not retrieve user data");
		});
	}, []);
	return (
		<>
			{isAuth ? (
				<div>{users && users[0].email}</div>
			) : (
				<div>Please log in first</div>
			)}
		</>
	);
};

export default Overview;
