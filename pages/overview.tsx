import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Overview: NextPage = () => {
	const isAuth = useSelector<RootState, boolean>(
		(state) => state.auth.isAuth
	);
	return <>{isAuth ? <div>logged</div> : <div>Please log in first</div>}</>;
};

export default Overview;
