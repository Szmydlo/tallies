import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import GoBackButton from "../Buttons/GoBackButton";
import LoginButton from "../Buttons/LoginButton";
import LogOutButton from "../Buttons/LogOutButton";
import SignupButton from "../Buttons/SignupButton";
import LoginModal from "../Login/LoginModal";
import { RootState } from "../../store";

interface State {
	isLoginModalVisible: boolean;
	isLoginButtonVisible: boolean;
	isGoBackButtonVisible: boolean;
	isSignUpButtonVisible: boolean;
	isLogOutButtonVisible: boolean;
}

type Action =
	| { type: "index" }
	| { type: "login" }
	| { type: "signup" }
	| { type: "logged" };

const initialState = {
	isLoginModalVisible: false,
	isLoginButtonVisible: true,
	isGoBackButtonVisible: false,
	isSignUpButtonVisible: true,
	isLogOutButtonVisible: false,
};

const reducer = (state: State, action: Action) => {
	let newState;
	switch (action.type) {
		case "index":
			newState = { ...initialState };
			return newState;
		case "login":
			newState = { ...initialState };
			newState.isLoginModalVisible = true;
			return newState;
		case "signup":
			newState = { ...initialState };
			newState.isGoBackButtonVisible = true;
			newState.isSignUpButtonVisible = false;
			newState.isLoginButtonVisible = false;
			return newState;
		case "logged":
			newState = { ...initialState };
			newState.isGoBackButtonVisible = false;
			newState.isSignUpButtonVisible = false;
			newState.isLoginButtonVisible = false;
			newState.isLogOutButtonVisible = true;
			return newState;
		default:
			throw new Error();
	}
};

export const NavBar = () => {
	const isAuth = useSelector<RootState, boolean>(
		(state) => state.auth.isAuth
	);
	const router = useRouter();
	const [state, dispatch] = useReducer(reducer, initialState);

	// adapt navBar buttons based on router.pathname
	useEffect(() => {
		if (router.pathname === "/signup") {
			dispatch({ type: "signup" });
		} else if (router.pathname === "/") {
			dispatch({ type: "index" });
		} else if (isAuth) {
			dispatch({ type: "logged" });
		}
	}, [router.pathname, isAuth]);

	return (
		<>
			{state.isLoginModalVisible && (
				<LoginModal onClose={() => dispatch({ type: "index" })} />
			)}
			<nav className="bg-gray-100">
				<div className="mx-auto max-w-6xl px-4">
					<div className="flex justify-end">
						<div className="flex space-x-4">
							<div className="flex items-center space-x-1">
								{state.isLoginButtonVisible && (
									<LoginButton
										onShowModal={() =>
											dispatch({ type: "login" })
										}
									/>
								)}
								{state.isSignUpButtonVisible && (
									<SignupButton />
								)}
								{state.isGoBackButtonVisible && (
									<GoBackButton />
								)}
								{state.isLogOutButtonVisible && (
									<LogOutButton />
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};
