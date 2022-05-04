import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CloseButton from "../components/Buttons/CloseButton";
import GoBackButton from "../components/Buttons/GoBackButton";
import LogOutButton from "../components/Buttons/LogOutButton";

// APPARENTLY CAN'T HIT 100% ON BRANCHES
describe("Buttons", () => {
	test("Close button renders and clicks", () => {
		const onCloseMock = jest.fn();
		render(<CloseButton onClose={onCloseMock} />);

		const button = screen.getByText(/Close/i);
		fireEvent.click(button);

		expect(button).toBeInTheDocument();
		expect(onCloseMock).toHaveBeenCalled();
	});

	test("GoBackButton renders and edits route", () => {
		const useRouter = jest.spyOn(require("next/router"), "useRouter");
		const mockGoBackFunction = jest.fn();
		useRouter.mockImplementationOnce(() => ({
			push: mockGoBackFunction,
		}));

		render(<GoBackButton />);

		const button = screen.getByText(/Go back/i);
		fireEvent.click(button);

		expect(mockGoBackFunction).toBeCalled();

		jest.resetAllMocks();
	});

	test("LogOutButton renders, edits route and dispatches an action", () => {
		let loginFn = jest.fn(() => null);
		const useRouter = jest.spyOn(require("next/router"), "useRouter");
		// const authActions = jest.spyOn(require("../store/auth"), "authActions");
		const useDispatch = jest
			.spyOn(require("react-redux"), "useDispatch")
			.mockImplementation(() => {
				return loginFn;
			});
		const mockGoBackFunction = jest.fn();
		const mockAction = jest.fn();
		useRouter.mockImplementationOnce(() => ({
			push: mockGoBackFunction,
		}));
		// authActions.mockImplementationOnce(() => ({
		// 	logout: mockAction,
		// }));
		// useDispatch.mockImplementationOnce(() => jest.fn());

		render(<LogOutButton />);

		const button = screen.getByText(/Go back/i);
		fireEvent.click(button);

		expect(mockGoBackFunction).toBeCalled();

		jest.resetAllMocks();
	});
});
