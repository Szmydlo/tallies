import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import CloseButton from "../components/Buttons/CloseButton";
import GoBackButton from "../components/Buttons/GoBackButton";
import LoginButton from "../components/Buttons/LoginButton";
import SignupButton from "../components/Buttons/SignupButton";

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

	test("SignupButton renders and edits route", () => {
		const useRouter = jest.spyOn(require("next/router"), "useRouter");
		const mockSignupNav = jest.fn();
		useRouter.mockImplementationOnce(() => ({
			push: mockSignupNav,
		}));

		render(<SignupButton />);

		const button = screen.getByText(/Sign up/i);
		fireEvent.click(button);

		expect(mockSignupNav).toBeCalled();

		jest.resetAllMocks();
	});

	test("Login button renders and clicks", () => {
		const onLoginMock = jest.fn();
		render(<LoginButton onShowModal={onLoginMock} />);

		const button = screen.getByText(/Login/i);
		fireEvent.click(button);

		expect(button).toBeInTheDocument();
		expect(onLoginMock).toHaveBeenCalled();
	});
});
