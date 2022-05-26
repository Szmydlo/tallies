import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CloseButton from "../components/Buttons/CloseButton";
import GoBackButton from "../components/Buttons/GoBackButton";
import LogOutButton from "../components/Buttons/LogOutButton";
import { useSelector, useDispatch } from "react-redux";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
	useSelector: jest.fn(),
	useDispatch: () => mockDispatch,
}));

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
		const useRouter = jest.spyOn(require("next/router"), "useRouter");
		const mockGoBackFunction2 = jest.fn();
		// const mockedDispatch = jest.fn(() => null);
		useRouter.mockImplementationOnce(() => ({
			push: mockGoBackFunction2,
		}));

		// const useDispatch = jest.spyOn(require("react-redux"), "useDispatch");
		// jest.spyOn(foo, "useDispatch").mockReturnValue(mockedDispatch);

		// const mockGoBackFunction = jest.fn();

		const mockedDispatch = jest.fn();
		useSelector.mockImplementation((selectorFn) => selectorFn());
		useDispatch.mockReturnValue(mockedDispatch);

		render(<LogOutButton />);

		const button = screen.getByText(/Go back/i);
		fireEvent.click(button);

		expect(mockGoBackFunction2).toBeCalled();
		// expect(loginFn).toBeCalled();
		expect(mockDispatch).toHaveBeenCalled(/*arguments your expect*/);
		jest.resetAllMocks();
	});
});
