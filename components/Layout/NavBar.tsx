import { clearSession, supabase } from "../../supabase-client";
import { useEffect, useReducer } from "react";

import LoginModal from "../Login/LoginModal";
import PrimaryButton from "../Buttons/PrimaryButton";
import { RootState } from "../../store";
import SecondaryButton from "../Buttons/SecondaryButton";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

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
	const dispatchAuth = useDispatch();
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleOpenLoginModal = (): void => {
		dispatch({ type: "login" });
	};

	const handleRedirect = async (page = "/"): Promise<void> => {
		try {
			await router.push(page);
		} catch (e) {
			throw new Error(e as string);
		}
	};

	const handleLogout = async () => {
		try {
			clearSession();
			await supabase.auth.signOut();
			dispatchAuth(authActions.logout() as Action);
			await router.push("/");
		} catch (e) {
			throw new Error(e as string);
		}
	};

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
									<SecondaryButton
										onClick={handleOpenLoginModal}
										text="Log in"
									/>
								)}
								{state.isSignUpButtonVisible && (
									<PrimaryButton
										onClick={async () => {
											await handleRedirect("/signup");
										}}
										text="Sign up"
									/>
								)}
								{state.isGoBackButtonVisible && (
									<SecondaryButton
										onClick={async () => {
											await handleRedirect();
										}}
										text="Go back"
									/>
								)}
								{state.isLogOutButtonVisible && (
									<SecondaryButton
										onClick={handleLogout}
										text="Log out"
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};
